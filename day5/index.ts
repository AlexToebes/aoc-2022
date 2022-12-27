import {Challenge, challenges} from "../helpers";
import { Stack } from "./Stack";

const challenge1: Challenge = (input) => {
    const [stackString, movesString] = input.split(/\r?\n\r?\n/);

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

    for (const {amount, from, to} of moves) {
        Stack.move(amount, from, to);
    }

    return stacks.map(stack => stack.getTopCrate()).join('');
};

const challenge2: Challenge = (input) => {
    const [stackString, movesString] = input.split(/\r?\n\r?\n/);

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

    for (const {amount, from, to} of moves) {
        Stack.move9001(amount, from, to);
    }

    return stacks.map(stack => stack.getTopCrate()).join('');
};

challenges(__dirname, {
    challenge1,
    challenge2
})
