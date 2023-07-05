import { Either, fromPromise, ap, right, flatten, left, getOrElse } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser } from './types';
import { fromNullable, none, getOrElse as ge, Some, isSome } from './fp/maybe';
import { ordNumber, revert } from './fp/ord';
import { distance } from './utils';

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => 
  <Promise<Either<string, ClientUser[]>>>fromPromise(fetchClient().then((clients) => clients.map(({name, demands, position, reward}): ClientUser => (
   {name, demands: fromNullable(demands), position, reward})
)))

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
  const clientByExecutorDemands = clients.filter(client => {
    const sortedExecutorPossibilities = executor.possibilities.sort()
    return client.demands == none || (isSome(client.demands) && client.demands.value.sort().every((element) => sortedExecutorPossibilities.includes(element)))
  })
  const clientCount = clientByExecutorDemands.length
  let possibilitiesMessage
  if (clientCount === 0){
    possibilitiesMessage = left('This executor cannot meet the demands of any client!')
  }
  else{
    const sortedClients = clientByExecutorDemands.sort((client1, client2) => {
      if(sortBy === SortBy.reward){
        return revert(ordNumber).compare(client1[sortBy], client2[sortBy])
      } else if(sortBy === SortBy.distance){
        return ordNumber.compare(distance(executor.position, client1.position), distance(executor.position, client2.position))
      }
    })
    const sortedClientsList = sortedClients.map(({name, position, reward}) => `name: ${name}, distance: ${distance(executor.position, position)}, reward: ${reward}`)
    const sortedClientsMessage = `Available clients sorted by ${sortBy === SortBy.distance ? 'distance to executor' : 'highest reward'}:\n${sortedClientsList.join('\n')}`
    if(clientCount === clients.length){
      possibilitiesMessage = right(`This executor meets all demands of all clients!\n\n${sortedClientsMessage}`)
    } else {
      possibilitiesMessage = right(`This executor meets the demands of only ${clientCount} out of ${clients.length} clients\n\n${sortedClientsMessage}`)
    }
  }
  return possibilitiesMessage
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    ))
);

