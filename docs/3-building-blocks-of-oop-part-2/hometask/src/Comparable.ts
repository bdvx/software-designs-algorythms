import { Item } from "./Item";

export interface Comparable<T> {
    compareTo(other: T): number
}
