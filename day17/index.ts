import {Challenge, challenges} from "../helpers";
import {RockSimulation} from "./RockSimulation";
import {PatternChecker} from "./PatternChecker";
const makeEta = require('simple-eta');

const challenge1: Challenge = (input) => {
    for (const simulation of new RockSimulation(input.trim())) {
        const {rocks} = simulation;
        if(rocks.length === 2022 && rocks.every(rock => rock.isResting)) {
            return rocks.reduce((max, rock) => Math.max(max, rock.pointCluster.boundingBox.to.y), 0);
        }
    }
};

const challenge2: Challenge = (input) => {
    const blocksLimit = 1000000000000;
    const eta = makeEta({ min: 0, max: blocksLimit });
    let nextEta = 0;

    const patternChecker = new PatternChecker<number>({
        repeatsCount: 4,
        minLength: 10,
    });

    let heightPerRock: number[] = [];
    let lastHeight = 0;

    for (const simulation of new RockSimulation(input.trim())) {
        const {rocks} = simulation;

        if (!rocks.every(rock => rock.isResting)) continue;

        const height = rocks.reduce((max, rock) => Math.max(max, rock.pointCluster.boundingBox.to.y), 0);
        heightPerRock.push(height - lastHeight);
        lastHeight = height;

        const patternCheckerResult = patternChecker.check(heightPerRock);
        if (!patternCheckerResult.found) continue;

        const {pattern} = patternCheckerResult;
        const patternHeight = pattern.reduce((sum, value) => sum + value, 0);

        let countHeight = heightPerRock.reduce((sum, height) => sum + height, 0);
        let count = heightPerRock.length;

        const patternFitsInBlockLimit = Math.floor((blocksLimit - count) / pattern.length);
        count += (pattern.length * patternFitsInBlockLimit);
        countHeight += (patternHeight * patternFitsInBlockLimit);

        while(count <= blocksLimit) {
            const patternIndex = (count - heightPerRock.length) % pattern.length;
            const patternValue = pattern.at(patternIndex);
            if (typeof patternValue === 'undefined') {
                throw new Error('Sad')
            }
            countHeight = countHeight + patternValue;

            if (count > nextEta) {
                eta.report(count);
                console.log(`Aprox. ${Math.ceil(eta.estimate())} seconds left`);
                nextEta += 1000000000;
            }
            count++;
        }
        return countHeight;
    }
};

challenges(__dirname, {
    challenge1,
    challenge2,
},
    // `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`
)
