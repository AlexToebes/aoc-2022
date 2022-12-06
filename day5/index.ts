import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import { Stack } from "./Stack";

(async (input) => {
    const [stackString, movesString] = (await input).split(/\r?\n\r?\n/);

    const stacks = Stack.fromString(stackString);

    const moves: {amount: number, from: Stack, to: Stack}[] = [];
    const moveRegex = /^move (\d+) from (\d+) to (\d+)$/gm;
    let moveMatch;

    while ((moveMatch = moveRegex.exec(movesString)) !== null) {
        const {1: amount, 2: fromId, 3: toId} = moveMatch;
        const from = stacks.find(stack => stack.stackId === parseInt(fromId));
        const to = stacks.find(stack => stack.stackId === parseInt(toId));
        if (from && to) moves.push({ amount: parseInt(amount), from, to})
    }

    // for (const {amount, from, to} of moves) {
    //     Stack.move(amount, from, to);
    // }

    for (const {amount, from, to} of moves) {
        Stack.move9001(amount, from, to);
    }

    console.log(stacks.map(stack => stack.getTopCrate()).join(''))

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
