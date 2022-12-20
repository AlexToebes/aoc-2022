import {IPacketData} from "./IPacketData";
import {Integer} from "./Integer";
import {StringIterator} from "./StringIterator";

export class List implements IPacketData {
    constructor(private data: IPacketData[]) {}

    validateOrder(right: List) {
        const left = this;
        return true;
    }

    static fromString(input: string): List {
        const trimmedInput = input.trim().substring(1);
        const charIterator = new StringIterator(trimmedInput);
        return List.fromCharIterator(charIterator);
    }

    static fromCharIterator(iterator: Iterable<string>) {
        const data: IPacketData[] = [];
        for (const char of iterator) {
            switch (true) {
                case char === '[':
                    data.push(List.fromCharIterator(iterator));
                    break;
                case char === ']':
                    return new List(data);
                case /\d/.test(char):
                    data.push(Integer.fromCharIterator(StringIterator.concat(char, iterator)));
                    break;
            }
        }

        return new List(data);
    }
}
