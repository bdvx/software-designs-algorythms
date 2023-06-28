import { Weapon } from "./Weapon";

export class Sword extends Weapon {
    baseDamage: number
    damageModifier: number = 0
    baseDurability: number
    durabilityModifier: number = 0

    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super('sword', baseDamage, baseDurability, value, weight)
        this.baseDamage = baseDamage
        this.baseDurability = baseDurability
    }

    polish(): void {
        if((this.damageModifier + Weapon.MODIFIER_CHANGE_RATE) <= (this.baseDamage * 0.25))
        this.damageModifier += Weapon.MODIFIER_CHANGE_RATE
    }
}
