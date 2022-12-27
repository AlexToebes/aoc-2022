import {Challenge, challenges} from "../helpers";
import {Rucksack} from "./Rucksack";
import {Item} from "./Item";

const challenge1: Challenge = (input) => {
    const lines = input.split(/\r?\n/).filter(line => line);

    const rucksacks = lines
        .map(line => Rucksack.fromString(line));

    return rucksacks
        .map(rucksack => rucksack.getIdenticalItemsInCompartments())
        .map(items => items
            .map(item => item.getPriority())
            .reduce((sum, p) => sum + p, 0)
        )
        .reduce((sum, p) => sum + p, 0);
};

const challenge2: Challenge = (input) => {
    const lines = input.split(/\r?\n/).filter(line => line);

    const rucksacks = lines
        .map(line => Rucksack.fromString(line));

    const groupByThree = function*<T> (items: T[]) {
        let group: T[] = [];
        for (const item of items) {
            group.push(item);
            if (group.length < 3) continue;
            yield group;
            group = [];
        }
    }

    return [...groupByThree(rucksacks)]
        .map(rucksackGroup => Item.findCommonItems(
            rucksackGroup[0].getAllItems(),
            rucksackGroup[1].getAllItems(),
            rucksackGroup[2].getAllItems(),
        ))
        .map(items => items
            .map(item => item.getPriority())
            .reduce((sum, p) => sum + p, 0)
        )
        .reduce((sum, p) => sum + p, 0);
};

challenges(__dirname, {
    challenge1,
    challenge2
})
