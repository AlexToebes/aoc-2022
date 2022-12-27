import chalk from 'chalk';
import {readFileSync} from "fs";
import {join as pathJoin} from "path";

export type Challenge = (input: string) => (any | Promise<any>);

export const challenges = async (
    dir: string,
    challenges: {[key: string]: Challenge},
    stringInput?: string,
) => {
    let input = stringInput
        ? stringInput
        : readFileSync(pathJoin(dir, 'input.txt'), 'utf-8');

    for (const [name, challenge] of Object.entries(challenges)) {
        const startTime = performance.now();
        const result = `${await challenge(input)}`;
        const endTime = performance.now();

        const milliseconds = Math.round(endTime - startTime);
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);

        const segment = (value: number, max: number) => `${value % max}`.padStart(`${max - 1}`.length, '0');

        const timing = `${minutes}:${segment(seconds, 60)}.${ segment(milliseconds, 1000)} sec`;

        console.log(`🎉🎉🎉 ${chalk.bold(name)} (${timing}): ${chalk.yellow(result)}`);
    }
}

