const {readFile} = require("fs");
const path = require("path");

(async () => {
    const input = await new Promise((resolve, reject) => readFile(path.join(__dirname, "input.txt"), 'utf-8', (err, data) => {
        if (err) reject(err); else resolve(data);
    }));

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

    console.log({sortedTotalList});


})().catch(e => console.error(e))
