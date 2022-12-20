import {IPacketData} from "./IPacketData";
import {Integer} from "./Integer";
import {StringIterator} from "./StringIterator";

export class List implements IPacketData {
    constructor(private data: IPacketData[]) {}

    validateOrder(right: IPacketData | undefined): boolean {
        if(!right) return false;

        const left = this;

        if(right instanceof Integer) {
            return this.validateOrder(new List([right]));
        }
        if(right instanceof List) {
            for (const pair of this.createListPair(right)) {
                if (!left) return true;
                if (left.validateOrder(right))
            }
            const a = this.createListPair(right as List).map(([left, right]) => {
                return left ? left.validateOrder(right) : true;
            }).includes()
            return true;
        }

        throw new Error('unhandled IPacketData type');
    }

    createListPair(right: List) {
        const left = this;
        const result: [IPacketData?, IPacketData?][] = [];
        for (let i = 0; left.data[i] || right.data[i]; i++) {
            result.push([left.data[i], right.data[i]]);
        }
        return result;
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
