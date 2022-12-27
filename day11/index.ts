import {Challenge, challenges} from "../helpers";
import {Monkey} from "./Monkey";

const challenge1: Challenge = (input) => {
    const rounds = 20;
    const monkeysGetBored = true;

    const monkeys = Monkey.fromString(input);

    for (let round = 1; round <= rounds; round++) {
        for (const monkey of monkeys) {
            while (monkey.hasItems()) {
                monkey.inspectAndThrow(monkeys, monkeysGetBored);
            }
        }
    }

    const [monkey1, monkey2] = monkeys.sort((a, b) => b.getInspectionCount() - a.getInspectionCount())
    return monkey1.getInspectionCount() * monkey2.getInspectionCount()
};

const challenge2: Challenge = (input) => {

};

challenges(__dirname, {
    challenge1,
    challenge2
})
