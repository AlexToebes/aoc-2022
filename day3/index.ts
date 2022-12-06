import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Rucksack} from "./Rucksack";
import {Item} from "./Item";

(async (input) => {
    const lines = (await input).split(/\r?\n/).filter(line => line);

    const rucksacks = lines
        .map(line => Rucksack.fromString(line));
    
    const challenge1 = () => rucksacks
        .map(rucksack => rucksack.getIdenticalItemsInCompartments())
        .map(items => items
            .map(item => item.getPriority())
            .reduce((sum, p) => sum + p, 0)
        )
        .reduce((sum, p) => sum + p, 0);
    
    const challenge2 = () => {
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
    }

    console.log(challenge2());

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
