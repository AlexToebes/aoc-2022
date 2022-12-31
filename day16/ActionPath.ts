import {Action, OpenValve} from "./Action";
import {Valve} from "./Valve";

export class ActionPath {
    static maxDuration = 30;

    readonly pressureReleased: number;
    readonly timeUsed: number;
    readonly openedValves: Valve[];

    constructor(readonly path: Action[]) {
        let totalFlowRate: number = 0;
        let currentFlowRate: number = 0;

        for (const {action} of ActionPath.minuteGenerator(this)) {
            totalFlowRate += currentFlowRate;
            if (action) currentFlowRate += action.getAddedFlowRate();
        }

        this.pressureReleased = totalFlowRate;
        this.timeUsed = this.path.reduce((sum, {duration}) => sum + duration, 0);
        this.openedValves = this.path.filter(action => action instanceof OpenValve).map(({valve}) => valve)
    }

    getNextActions(skipValves?: Valve[]): Iterable<ActionPath> {
        return ActionPath.getNextActions(this, skipValves);
    }

    static getNextActions = function*(actionPath: ActionPath, skipValves?: Valve[]): Iterable<ActionPath> {
        const lastAction = actionPath.path.at(-1);
        if (!lastAction) return [];

        for (const action of lastAction.getNextActions(skipValves)) {
            // Skip paths that exceed maxDuration
            if (actionPath.timeUsed + action.duration >= ActionPath.maxDuration) continue;
            // Don't visit valves that are already opened
            if (actionPath.openedValves.includes(action.valve)) continue;

            const nextAction = new ActionPath([...actionPath.path, action]);

            yield nextAction;
        }
    }

    static minuteGenerator = function*(actionPath: ActionPath): Iterable<{ minute: number, action?: Action }> {
        let minute = 0;
        for (const action of actionPath.path) {
            for (let i = 1; i <= action.duration; i++) {
                yield {
                    minute: ++minute,
                    ...(i == action.duration ? {action} : {})
                };
            }
        }

        while (minute < ActionPath.maxDuration) {
            yield { minute: ++minute }
        }
    }

    static actionPathGenerator = function*(actionPath: ActionPath, skipValves?: Valve[]): Iterable<ActionPath> {
        const nextActionPaths = actionPath.getNextActions(skipValves);
        yield actionPath;
        for (const nextActionPath of nextActionPaths) {
            yield* ActionPath.actionPathGenerator(nextActionPath, skipValves);
        }
    }

    static teamActionPathGenerator = function*(actionPaths: ActionPath[], skipValves?: Valve[]): Iterable<ActionPath[]> {
        const [actionPath, ...otherActionPaths] = actionPaths;

        if (otherActionPaths.length < 1) {
            for (const nextAPs of ActionPath.actionPathGenerator(actionPath, skipValves)) {
                yield [nextAPs];
            }
            return;
        }

        for (const nextOtherActionPath of ActionPath.teamActionPathGenerator(otherActionPaths, skipValves)) {
            const nextSkipValves = nextOtherActionPath.reduce(
                (nextSkipValves, {openedValves}) => {
                    return nextSkipValves.concat(openedValves.filter(valve => !nextSkipValves.includes(valve)));
                },
                skipValves || [],
            );

            for (const nextActionPaths of ActionPath.actionPathGenerator(actionPath, nextSkipValves)) {
                yield [nextActionPaths, ...nextOtherActionPath];
            }
        }
    }
}
