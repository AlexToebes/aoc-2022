import {Challenge, challenges} from "../helpers";

const challenge1: Challenge = (input) => {
    console.log(input.split(/\r?\n/).filter(line => line));
};

const challenge2: Challenge = (input) => {

};

challenges(__dirname, {
    challenge1,
    challenge2
})
