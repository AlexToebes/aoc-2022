import {Challenge, challenges} from "../helpers";

const challenge1: Challenge = (input) => {
    return input
        .split(/\r?\n/)
        .filter(([a, _ , b]) => a && b)
        .map(([a, _ , b]) => {
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

            throw new Error('Invalid game');
        })
        .map(({b, game}) => {
            let score = 0;
            if (game === 'won') score += 6;
            if (game === 'draw') score += 3;

            if (b === 'X') score += 1;
            if (b === 'Y') score += 2;
            if (b === 'Z') score += 3;
            return score;
        })
        .reduce((sum, score) => sum + score, 0);

};

const challenge2: Challenge = (input) => {
    return input
        .split(/\r?\n/)
        .filter(([a, _ , b]) => a && b)
        .map(([a, _ , b]) => {
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

            throw new Error('Invalid game');
        })
        .map(([a, _ , b]) => {
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

            throw new Error('Invalid game');
        })
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
};

challenges(__dirname, {
    challenge1,
    challenge2
})
