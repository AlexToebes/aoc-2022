// @ts-nocheck
import {Challenge, challenges} from "../helpers";

const challenge1: Challenge = (input) => {
    const inputLineByLine = input.split(/\r?\n/);

    const listGenerator = function* (inputLineByLine, separator) {
        let list = [];

        for (const inputLine of inputLineByLine) {
            if (inputLine === separator) {
                yield list;
                list = [];
                continue;
            }
            list = [...list, inputLine];
        }
    }

    const list = [...listGenerator(inputLineByLine, '')].map((subList) => subList.map(i => parseInt(i)));

    const totalList = list.map(i => i.reduce((a, j) => a + j, 0));

    const sortedTotalList = totalList.sort((a, b) => b - a);

    return sortedTotalList[0];
};

const challenge2: Challenge = (input) => {
    const inputLineByLine = input.split(/\r?\n/);

    const listGenerator = function* (inputLineByLine, separator) {
        let list = [];

        for (const inputLine of inputLineByLine) {
            if (inputLine === separator) {
                yield list;
                list = [];
                continue;
            }
            list = [...list, inputLine];
        }
    }

    const list = [...listGenerator(inputLineByLine, '')].map((subList) => subList.map(i => parseInt(i)));

    const totalList = list.map(i => i.reduce((a, j) => a + j, 0));

    const sortedTotalList = totalList.sort((a, b) => b - a);

    return sortedTotalList[0] + sortedTotalList[1] + sortedTotalList[2];
};

challenges(__dirname, {
    challenge1,
    challenge2
})
