import {Challenge, challenges} from "../helpers";
import {Assignment} from "./Assignment";

const challenge1: Challenge = (input) => {
    const lines = input
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => line.split(','));

    const assignmentPairs = lines.map(line => line.map(part => Assignment.fromString(part)))

    return assignmentPairs
        .map(([ass1, ass2]) => ass1.contains(ass2) || ass2.contains(ass1))
        .filter(r => r)
        .length;
};

const challenge2: Challenge = (input) => {
    const lines = input
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => line.split(','));

    const assignmentPairs = lines.map(line => line.map(part => Assignment.fromString(part)))

    return assignmentPairs
        .map(([ass1, ass2]) => ass1.overlaps(ass2))
        .filter(r => r)
        .length;
};

challenges(__dirname, {
    challenge1,
    challenge2
})
