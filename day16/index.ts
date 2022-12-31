import {Challenge, challenges} from "../helpers";
import {Valve} from "./Valve";
import {ActionPath} from "./ActionPath";
import {ElephantTraining, Start} from "./Action";

const challenge1: Challenge = (input) => {
    const valveLayout = Valve.fromString(input);
    const startValve = valveLayout.find(({name}) => name === 'AA');
    if (!startValve) throw new Error(`startValve not found!`);

    const skipValves = valveLayout.filter(({flowRate}) => flowRate < 1);

    const actionPathIterator = ActionPath.actionPathGenerator(
        new ActionPath([new Start(startValve)]),
        skipValves,
    );

    let bestActionPath: ActionPath | undefined;
    
    for (const actionPath of actionPathIterator) {
        if (!bestActionPath || bestActionPath.pressureReleased < actionPath.pressureReleased) {
            bestActionPath = actionPath;
        }
    }

    return bestActionPath?.pressureReleased;
};

const challenge2: Challenge = (input) => {
    const valveLayout = Valve.fromString(input);
    const startValve = valveLayout.find(({name}) => name === 'AA');
    if (!startValve) throw new Error(`startValve not found!`);

    const skipValves = valveLayout.filter(({flowRate}) => flowRate < 1);

    const teamActionPathIterator = ActionPath.teamActionPathGenerator([
        new ActionPath([new ElephantTraining(startValve)]),
        new ActionPath([new ElephantTraining(startValve)]),
    ], skipValves);

    let bestTeamActionPath: number | undefined;

    for (const teamActionPath of teamActionPathIterator) {
        const pressureReleased = teamActionPath.reduce((sum, {pressureReleased}) => sum + pressureReleased, 0);
        if (!bestTeamActionPath || bestTeamActionPath < pressureReleased) {
            bestTeamActionPath = pressureReleased;
        }
    }

    return bestTeamActionPath;
};

challenges(__dirname, {
    challenge1,
    challenge2
},
// `
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II
// `
)
