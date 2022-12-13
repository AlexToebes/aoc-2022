import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Monkey} from "./Monkey";

(async (input) => {
    const monkeys = Monkey.fromString((await input));

    const rounds = 20;
    const monkeysGetBored = true;

    for (let round = 1; round <= rounds; round++) {
        for (const monkey of monkeys) {
            while (monkey.hasItems()) {
                monkey.inspectAndThrow(monkeys, monkeysGetBored);
            }
        }
    }

    console.log(monkeys.map(monkey => `Monkey ${monkey.id} inspected items ${monkey.getInspectionCount()} times.`).join("\n"))

    const [monkey1, monkey2] = monkeys.sort((a, b) => b.getInspectionCount() - a.getInspectionCount())
    console.log({challenge1: monkey1.getInspectionCount() * monkey2.getInspectionCount()});

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
// })(`Monkey 0:
//   Starting items: 79, 98
//   Operation: new = old * 19
//   Test: divisible by 23
//     If true: throw to monkey 2
//     If false: throw to monkey 3
//
// Monkey 1:
//   Starting items: 54, 65, 75, 74
//   Operation: new = old + 6
//   Test: divisible by 19
//     If true: throw to monkey 2
//     If false: throw to monkey 0
//
// Monkey 2:
//   Starting items: 79, 60, 97
//   Operation: new = old * old
//   Test: divisible by 13
//     If true: throw to monkey 1
//     If false: throw to monkey 3
//
// Monkey 3:
//   Starting items: 74
//   Operation: new = old + 3
//   Test: divisible by 17
//     If true: throw to monkey 0
//     If false: throw to monkey 1
// `)
