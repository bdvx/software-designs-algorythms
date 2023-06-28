import { Item } from "./Item";

export class Consumable extends Item {
    isConsumed: boolean
    isSpoiled: boolean

    constructor(name: string, value: number, weight: number, isSpoiled?: boolean) {
        super(name, value, weight);
        this.isSpoiled = isSpoiled ? isSpoiled : false;
    }

    use(): string {
        if(this.isConsumed){
            return `There's nothing left of the ${this.name} to consume.`
        } else if(this.isSpoiled){
            return `You consumed the ${this.name}.\nYou feel sick.`
        } else {
            return `You consumed the ${this.name}.`
        }
    }
}
