import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Assignment} from "./Assignment";

(async (input) => {
    const lines = (await input)
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => line.split(','));

    const assignmentPairs = lines.map(line => line.map(part => Assignment.fromString(part)))

    const challenge1 = () => {
        return assignmentPairs
            .map(([ass1, ass2]) => ass1.contains(ass2) || ass2.contains(ass1))
            .filter(r => r)
            .length;
    }

    const challenge2 = () => {
        return assignmentPairs
            .map(([ass1, ass2]) => ass1.overlaps(ass2))
            .filter(r => r)
            .length;
    }

    console.log(challenge2());

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
