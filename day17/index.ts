import {Challenge, challenges} from "../helpers";
import {RockSimulation} from "./RockSimulation";

const challenge1: Challenge = (input) => {
    for (const simulation of new RockSimulation(input.trim())) {
        const {rocks} = simulation;
        if(rocks.length === 2022 && rocks.every(rock => rock.isResting)) {
            return rocks.reduce((max, rock) => Math.max(max, rock.pointCluster.boundingBox.to.y), 0);
        }
    }
};

const challenge2: Challenge = (input) => {
};

challenges(__dirname, {
    challenge1,
    challenge2,
},
    // `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`
)
