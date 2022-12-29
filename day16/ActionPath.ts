import {Action, OpenValve} from "./Action";
import {Valve} from "./Valve";

export type ActionPathFilter = (value: ActionPath, index: number, array: ActionPath[]) => (boolean | undefined);

export class ActionPath {
    static maxPathLength = 30;

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

    getNextActions(): Iterable<ActionPath> {
        return ActionPath.getNextActions(this);
    }

    static getNextActions = function*(actionPath: ActionPath): Iterable<ActionPath> {
        const lastAction = actionPath.path.at(-1);
        if (!lastAction) return [];

        yield* [...lastAction.getNextActions()]
            .filter(action => {
                return actionPath.timeUsed + action.duration < ActionPath.maxPathLength
                    && action.valve.flowRate > 0
                    && !actionPath.openedValves.includes(action.valve);
            })
            .map(action => new ActionPath([...actionPath.path, action]))
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

        while (minute < ActionPath.maxPathLength) {
            yield { minute: ++minute }
        }
    }

    static actionPathGenerator = function*(actionPath: ActionPath): Iterable<ActionPath> {
        const nextActionPaths = actionPath.getNextActions();
        yield actionPath;
        for (const nextActionPath of nextActionPaths) {
            yield* ActionPath.actionPathGenerator(nextActionPath);
        }
    }
}
