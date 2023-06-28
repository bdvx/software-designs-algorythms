import { Weapon } from "./Weapon";

export class Bow extends Weapon {
    baseDamage: number
    damageModifier: number = 0
    baseDurability: number
    durabilityModifier: number = 0

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super('bow', baseDamage, baseDurability, value, weight)
        this.baseDamage = baseDamage
        this.baseDurability = baseDurability
    }

    polish(): void {
        if((this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE + this.baseDurability) <= 1)
        this.durabilityModifier += Weapon.MODIFIER_CHANGE_RATE
    }
}
