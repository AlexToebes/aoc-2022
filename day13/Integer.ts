import {IPacketData} from "./IPacketData";

export class Integer implements IPacketData {
    constructor(readonly data: number) {}

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
