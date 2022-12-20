import {IPacketData} from "./IPacketData";
import {List} from "./List";

export class Integer implements IPacketData {
    constructor(readonly data: number) {}

    validateOrder(right: IPacketData | undefined): boolean {
        const left = this;
        switch (true) {
            case right instanceof List:
                return new List([left]).validateOrder(right);
            case right instanceof Integer:
                return true;

        }
        throw new Error('unhandled IPacketData type');
    }

    static fromCharIterator(iterator: Iterable<string>) {
        let buffer = '';
        for (const char of iterator) {
            if (!isNaN(parseInt(char))) {
                buffer += char;
                continue;
            }
            break;
        }
        return new Integer(parseInt(buffer));
    }
}
