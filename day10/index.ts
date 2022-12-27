import {Challenge, challenges} from "../helpers";
import {Cpu} from "./Cpu";
import {Crt} from "./Crt";

const challenge1: Challenge = (input) => {
    const instructions = input.split(/\r?\n/).filter(line => line);

    const cpu = new Cpu(instructions);

    let output = 0;
    for (const {cycle, x} of cpu) {
        if ([20, 60, 100, 140, 180, 220].includes(cycle)) output += (cycle * x);
    }
    return output;
};

const challenge2: Challenge = (input) => {
    const instructions = input.split(/\r?\n/).filter(line => line);

    const cpu = new Cpu(instructions);
    const crt = new Crt(40, 6);

    let challenge2 = ``;

    for (const {x} of cpu) {
        const {value: crtChar} = crt.next(x);
        challenge2 += crtChar;
    }

    return challenge2
};

challenges(__dirname, {
    challenge1,
    challenge2
})
