import { number } from "prop-types";
import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
    readonly numberOfSlices: number
    numberOfEatenSlices: number = 0
    baseDurability: number
    durabilityModifier: number = 0

    constructor(value: number, weight: number, numberOfSlices: number, isSpoiled?: boolean) {
        super('pizza', value, weight, isSpoiled)
        this.numberOfSlices = numberOfSlices
    }

    use(): string {
        if(this.numberOfSlices - this.numberOfEatenSlices > 0) {
            this.numberOfEatenSlices += 1
            return 'You consumed a slice of the pizza.'
        } else {
            return "There's nothing left of the pizza to consume."
        }
    }

    getNumberOfEatenSlices() : number {
        return this.numberOfEatenSlices
    }
}
