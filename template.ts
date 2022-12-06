import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";

(async (input) => {
    const lines = (await input).split(/\r?\n/).filter(line => line);

    console.log(lines);

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
