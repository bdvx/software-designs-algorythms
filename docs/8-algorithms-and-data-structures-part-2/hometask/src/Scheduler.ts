import { PriorityQueue, QElement } from "./PriorityQueue";

export interface SchedulerI {
  postTask(task: () => Promise<any>, priority: number): void;
  run(): Promise<any[]>;
}

export class Scheduler implements SchedulerI {
  priorityQueue: PriorityQueue<QElement>
  constructor()
  {
      this.priorityQueue = new PriorityQueue;
  }
  public postTask(task: () => Promise<any>, priority: number): void {
    this.priorityQueue.enqueue(task, priority);
  }
  public run(): Promise<any[]> {
    const promises = []
    const length = this.priorityQueue.items.length
    for (let i = 0; i < length; i++) {
      const element = this.priorityQueue.dequeue()
      promises.push(element())
    }
    return Promise.all(promises)
  }
}
