export interface ItemComparator<T> {
    compare(first: T, second: T): number
}