import { Item } from "./Item";

export class Weapon extends Item {
    baseDamage: number
    damageModifier: number = 0
    baseDurability: number
    durabilityModifier: number = 0
    static MODIFIER_CHANGE_RATE = 0.05

    constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(name, value, weight)
        this.baseDamage = baseDamage
        this.baseDurability = baseDurability
    }

    getEffectiveDamage() : number {
        return this.baseDamage + this.damageModifier
    }
    getEffectiveDurability();
    getEffectiveDurability(durabilityModifier: number)
    getEffectiveDurability(durabilityModifier?: number) : number {
        return this.baseDurability + (durabilityModifier ? durabilityModifier : this.durabilityModifier)
    }

    use() : string {
        if(this.baseDurability <= 0) {
            return `You can't use the ${this.name}, it is broken.`
        } else {
            this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE
            if(this.baseDurability <= 0) {
                return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.\nThe ${this.name} breaks.`
            }
            return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`
        }

    }
    
    public toString() : string {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}, Damage: ${this.getEffectiveDamage().toFixed(2)}, Durability: ${(this.getEffectiveDurability() * 100).toFixed(2)}%`
    }
}
