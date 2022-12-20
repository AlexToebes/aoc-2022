import {IPacketData, ValidationResult} from "./IPacketData";
import {Integer} from "./Integer";
import {StringIterator} from "./StringIterator";

export class List implements IPacketData {
    constructor(private data: IPacketData[]) {}

    validate(right: IPacketData | undefined): ValidationResult {
        if(!right) {
            return ValidationResult.Bad;
        }

        if(right instanceof Integer) {
            return this.validate(new List([right]));
        }
        if(right instanceof List) {
            for (const pair of this.createListPair(right)) {
                if (!pair.left) {
                    return ValidationResult.Good;
                }

                const validationResult = pair.left.validate(pair.right);
                if ([
                    ValidationResult.Good,
                    ValidationResult.Bad
                ].includes(validationResult)) {
                    return validationResult;
                }
            }
            return ValidationResult.Maybe;
        }

        throw new Error('unhandled IPacketData type');
    }

    createListPair(right: List) {
        const left = this;
        const result: {left?: IPacketData, right?: IPacketData}[] = [];
        for (let i = 0; left.data[i] || right.data[i]; i++) {
            result.push({
                left: left.data[i],
                right: right.data[i],
            });
        }
        return result;
    }

    toString(): string {
        return `[${this.data.join(',')}]`;
    }

    static fromString(input: string): List {
        const trimmedInput = input.trim().substring(1);
        const charIterator = new StringIterator(trimmedInput);
        return List.fromCharIterator(charIterator);
    }

    static fromCharIterator(iterator: Iterable<string>) {
        const data: IPacketData[] = [];
        let integerStringBuffer = '';
        for (const char of iterator) {
            if (/\d/.test(char)) {
                integerStringBuffer += char;
                continue
            } else if (integerStringBuffer.length > 0) {
                data.push(Integer.fromCharIterator(integerStringBuffer));
                integerStringBuffer = '';
            }
            if (char === '[') {
                data.push(List.fromCharIterator(iterator));
                continue;
            }
            if (char === ']') {
                return new List(data);
            }
        }

        return new List(data);
    }
}
