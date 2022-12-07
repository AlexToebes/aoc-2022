const fs = require("fs");
const path = require("path");

const readFile = (inputPath) => new Promise((resolve, reject) => {
    fs.readFile(inputPath, 'utf-8', (err, data) => {
        if (err) reject(err); else resolve(data);
    });
});

(async () => {
    const input = await readFile(path.join(__dirname, "input.txt"));
    const inputLines = input
        .split(/\r?\n/)
        .filter(([a, _ , b]) => a && b);

    const challenge1 = (input) => input.map(([a, _ , b]) => {
        const result = {a, b};

        /**
         * A/X for Rock
         * B/Y for Paper
         * C/Z for Scissors
         */

        if (a === 'A' && b === 'X') return {...result, game: 'draw'};
        if (a === 'B' && b === 'Y') return {...result, game: 'draw'};
        if (a === 'C' && b === 'Z') return {...result, game: 'draw'};

        if (a === 'A' && b === 'Z') return {...result, game: 'lost'};
        if (a === 'C' && b === 'Y') return {...result, game: 'lost'};
        if (a === 'B' && b === 'X') return {...result, game: 'lost'};

        if (a === 'B' && b === 'Z') return {...result, game: 'won'};
        if (a === 'A' && b === 'Y') return {...result, game: 'won'};
        if (a === 'C' && b === 'X') return {...result, game: 'won'};

        return {};
    });

    const challenge2 = (input) => {
        return challenge1(input.map(([a, _ , b]) => {
            const result = [a, ''];

            /**
             * A/X for Rock
             * B/Y for Paper
             * C/Z for Scissors
             */

            if (a === 'A' && b === 'X') return [...result, 'Z'];
            if (a === 'B' && b === 'Y') return [...result, 'Y'];
            if (a === 'C' && b === 'Z') return [...result, 'X'];

            if (a === 'A' && b === 'Z') return [...result, 'Y'];
            if (a === 'C' && b === 'Y') return [...result, 'Z'];
            if (a === 'B' && b === 'X') return [...result, 'X'];

            if (a === 'B' && b === 'Z') return [...result, 'Z'];
            if (a === 'A' && b === 'Y') return [...result, 'X'];
            if (a === 'C' && b === 'X') return [...result, 'Y'];
        }));
    }

    console.log(
        challenge2(inputLines)
            .map(({b, game}) => {
                let score = 0;
                if (game === 'won') score += 6;
                if (game === 'draw') score += 3;

                if (b === 'X') score += 1;
                if (b === 'Y') score += 2;
                if (b === 'Z') score += 3;
                return score;
            })
            .reduce((sum, score) => sum + score, 0)
    );
})().catch(e => console.error(e))
