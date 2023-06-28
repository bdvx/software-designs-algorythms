import { Item } from "./Item";
import { Inventory } from "./Inventory";
import { ItemComparator } from "./ItemComparator";

describe("Inventory", () => {
  beforeEach(() => {
    Item.resetIdCounter();
  });

  it("should add items", () => {
    const item = new Item("ring", 2, 1);
    const inventory = new Inventory();

    inventory.addItem(item);

    expect(inventory.toString()).toEqual("ring − Value: 2.00, Weight: 1.00");
  });

  describe("sort()", () => {
    it("should sort items by comparator", () => {
      const item = new Item("ring1", 3, 1);
      const item2 = new Item("ring2", 4, 2);
      const inventory = new Inventory();

      inventory.addItem(item);
      inventory.addItem(item2);

      const comparator: ItemComparator<Item> = {
        compare: () => -1,
      };
      const compareSpy = spyOn(comparator, "compare");

      inventory.sort(comparator);

      expect(compareSpy).toHaveBeenCalledWith(
        { id: 2, name: "ring2", value: 4, weight: 2 },
        { id: 1, name: "ring1", value: 3, weight: 1 }
      );

      expect(inventory.toString()).toEqual("ring1 − Value: 3.00, Weight: 1.00, ring2 − Value: 4.00, Weight: 2.00");
    });

    it("should sort items by value", () => {
      const item1 = new Item("ring1", 4, 2);
      const item2 = new Item("ring2", 3, 1);
      const inventory = new Inventory();

      inventory.addItem(item1);
      inventory.addItem(item2);
      inventory.sort();

      expect(inventory.toString()).toEqual("ring2 − Value: 3.00, Weight: 1.00, ring1 − Value: 4.00, Weight: 2.00");
    });
  });
});
