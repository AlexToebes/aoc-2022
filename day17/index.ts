import {Challenge, challenges} from "../helpers";
import {RockSimulation} from "./RockSimulation";

const challenge1: Challenge = (input) => {
    for (const rocks of new RockSimulation()) {
        if(rocks.length === 2022 && rocks.every(rock => rock.isResting)) {
            const lastRock = rocks.at(-1);
            if (!lastRock) throw new Error('Something is not right here...')
            return lastRock.getBoundingBox()
        }
    }
};

const challenge2: Challenge = (input) => {

};

challenges(__dirname, {
    challenge1,
    challenge2
})
