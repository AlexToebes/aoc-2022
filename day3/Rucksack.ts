import {Item} from "./Item";

export class Rucksack {
    readonly compartments: [Item[], Item[]];

    constructor(items: Item[]) {
        const length = items.length;
        const middleIndex = length / 2;

        this.compartments = [
            items.slice(0, middleIndex),
            items.slice(middleIndex),
        ]
    }

    getItemsInFirstCompartment() {
        return this.compartments[0];
    }

    getItemsInSecondCompartment() {
        return this.compartments[1];
    }

    getAllItems() {
        return [
            ...this.getItemsInFirstCompartment(),
            ...this.getItemsInSecondCompartment(),
        ]
    }

    getIdenticalItemsInCompartments() {
        return Item.findCommonItems(
            this.getItemsInFirstCompartment(),
            this.getItemsInSecondCompartment(),
        );
    }

    static fromString(string: string) {
        return new Rucksack(Item.fromString(string));
    }
}
