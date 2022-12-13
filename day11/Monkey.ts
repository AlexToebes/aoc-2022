import {simpleMathParser} from "./SimpleMathParser";

export type Item = number;
export type WorryLevel = number;

export class Monkey {
    private inspectionCount = 0;

    constructor(
        readonly id: number,
        private items: Item[],
        private operation: (number: Item) => Item,
        private test: (number: WorryLevel) => boolean,
        private ifTrueThrowTo: (monkeys: Monkey[]) => Monkey,
        private ifFalseThrowTo: (monkeys: Monkey[]) => Monkey,
    ) {}

    getInspectionCount() {
        return this.inspectionCount;
    }

    hasItems() {
        return this.items.length > 0;
    }

    inspectAndThrow(monkeys: Monkey[], getsBored: boolean) {
        const item = this.items.shift();

        if (!item) return;
        this.inspectionCount++;

        const itemAfterOperation = this.operation(item);

        const itemAfterBored = getsBored ? Math.floor(itemAfterOperation / 3) : itemAfterOperation;

        let monkey = this.test(itemAfterBored)
            ? this.ifTrueThrowTo(monkeys)
            : this.ifFalseThrowTo(monkeys);

        monkey.catchItem(itemAfterBored);
    }

    catchItem(item: Item) {
        this.items.push(item);
    }

    static fromString(string: string): Monkey[] {
        const monkeyStringRegex = /Monkey\s+(?<id>\d+):\s+Starting items:\s*(?<startingItems>.*?)\n\s+Operation:\s*(?<operation>.*?)\n\s+Test:\s*(?<test>.*?)\n\s+If true:\s*(?<ifTrue>.*?)\n\s+If false:\s*(?<ifFalse>.*?)\n/g;

        const monkeys: Monkey[] = [];

        let m;
        while ((m = monkeyStringRegex.exec(string)) !== null) {
            const {groups} = m;
            const {id, startingItems, operation, test, ifTrue, ifFalse} = groups || {};

            monkeys.push(new Monkey(
                this.parseIdFromString(id),
                this.parseItemsFromString(startingItems),
                this.parseOperationFromString(operation),
                this.parseTestFromString(test),
                this.parseIfFromString(ifTrue),
                this.parseIfFromString(ifFalse),
            ));
        }

        return monkeys;
    }

    static parseIdFromString(string: string): number {
        const id = parseInt(string);
        if (!isNaN(id)) return id;
        throw new Error(`Monkey.parseIdFromString: "${string}" can not be parsed to a number`);
    }

    static parseItemsFromString(string: string): Item[] {
        return string.trim() !== ''
            ? string.trim()
                .split(',')
                .map(itemString => itemString.trim())
                .map(itemString => {
                    const item: Item = parseInt(itemString);
                    if (!isNaN(item)) return item;
                    throw new Error(`Monkey.parseItemsFromString: "${itemString}" can not be parsed to a number`);
                })
            : [];
    }

    static parseOperationFromString(string: string): (number: Item) => WorryLevel {
        const math = simpleMathParser(string);
        return (number) => math({old: number});
    }

    static parseTestFromString(string: string): (number: WorryLevel) => boolean {
        if (string.trim().startsWith('divisible by')) {
            const denominator = parseInt(string.trim().substring(12));
            return (number) => number % denominator === 0;
        }
        throw new Error(`Monkey.parseTestFromString: Unable to parse "${string}"`);
    }

    static parseIfFromString(string: string): (monkeys: Monkey[]) => Monkey {
        if (string.trim().startsWith('throw to monkey')) {
            const monkeyId = parseInt(string.trim().substring(16));
            return (monkeys) => {
                const monkey = monkeys.find(monkey => monkey.id === monkeyId);
                if (!monkey) throw new Error(`Monkey.parseIfFromString: Unable to find "${monkeyId}"`);
                return monkey;
            }
        }
        throw new Error(`Monkey.parseIfFromString: Unable to parse "${string}"`);
    }
}
