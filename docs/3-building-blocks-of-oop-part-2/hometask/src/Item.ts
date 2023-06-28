import { Comparable } from "./Comparable";

export class Item implements Comparable<Item> {
    private static idCounter: number = 0;
    readonly id: number
    readonly name: string
    value: number
    weight: number

    constructor(name: string, value: number, weight: number) {
        this.id = ++Item.idCounter
        this.name = name
        this.value = value
        this.weight = weight
    }

    public static resetIdCounter() : void {
        Item.idCounter = 0
    }

    public compareTo(other: Item) : number {
        if(this.value !== other.value){
            return this.value > other.value ? 1 : -1
        } 
        return this.name.localeCompare(other.name)
    }

    public getId() : number {
        return this.id
    }
    
    public toString() : string {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
    }
}