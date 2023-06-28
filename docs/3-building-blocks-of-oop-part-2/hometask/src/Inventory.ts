import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
    items: Item[]

    constructor(items?: Item[]) {
        this.items = items ? items : [];
    }
    sort() : void 
    sort(comparator: ItemComparator<Item>) : void 
    sort(comparator?: ItemComparator<Item>) : void {
        if(comparator){
            this.items = this.items.sort((a, b) => comparator.compare(a, b));
        }
        this.items = this.items.sort((a, b) => {
            if(a.value === b.value) return 0;
            return a.value > b.value ? 1 : -1
        })
    }

    addItem(item: Item) : void {
        this.items.push(item)
    }

    toString() : string {
        return this.items.join(', ')
    }
}
