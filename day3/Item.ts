export class Item {
    static priorityList = [...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'];

    private constructor(readonly char: string) {
        if (char.length !== 1) throw new Error(`Char "${char}" needs to be a single character.`);
        if (Item.priorityList.indexOf(char) < 0) throw new Error(`Char "${char}" is not a item.`);
    }

    getPriority() {
        return Item.priorityList.indexOf(this.char) + 1;
    }

    equals(item: Item) {
        //console.log(`${this.char === item.char}, ${this.char}, ${item.char}`)
        return this.char == item.char;
    }

    static fromChar(char: string) {
        return new Item(char);
    }

    static fromString(string: string) {
        return [...string].map(char => Item.fromChar(char));
    }

    static findCommonItems(itemList1: Item[], itemList2: Item[], ...itemLists: Item[][]): Item[] {
        const commonItems = itemList1.filter((item1) => itemList2.find((item2) => item1.equals(item2)))
            .reduce<Item[]>((acc, item1) => acc.find((item2) => item1.equals(item2)) ? acc : [...acc, item1], []);

        const itemList3 = itemLists.shift();
        return !itemList3 ? commonItems : Item.findCommonItems(commonItems, itemList3, ...itemLists);
    }
}
