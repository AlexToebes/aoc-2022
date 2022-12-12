import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Cpu} from "./Cpu";
import {Crt} from "./Crt";

(async (input) => {
    const instructions = (await input).split(/\r?\n/).filter(line => line);

    const cpu = new Cpu(instructions);
    const crt = new Crt(40, 6);

    let challenge1 = 0;
    let challenge2 = ``;

    for (const {cycle, x} of cpu) {
        if ([20, 60, 100, 140, 180, 220].includes(cycle)) challenge1 += (cycle * x);

        const {value: crtChar} = crt.next(x);
        challenge2 += crtChar;
    }

    console.log({challenge1, challenge2});
})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
