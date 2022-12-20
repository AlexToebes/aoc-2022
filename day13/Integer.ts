import {IPacketData, ValidationResult} from "./IPacketData";
import {List} from "./List";

export class Integer implements IPacketData {
    constructor(readonly data: number) {}

    validate(right: IPacketData | undefined): ValidationResult {
        if(!right) {
            return ValidationResult.Bad;
        }

        if (right instanceof List) {
            return new List([this]).validate(right);
        }

        if (right instanceof Integer) {
            if (this.data < right.data) return ValidationResult.Good;
            if (this.data > right.data) return ValidationResult.Bad;
            return ValidationResult.Maybe;
        }

        throw new Error('unhandled IPacketData type');
    }


    toString(): string {
        return `${this.data}`;
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
