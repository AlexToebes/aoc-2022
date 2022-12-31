import {Valve} from "./Valve";

export abstract class Action {
    constructor(readonly valve: Valve, readonly duration: number) {}

    getAddedFlowRate(): number {
        return 0;
    }

    getNextActions(skipValves?: Valve[]): Iterable<Action> {
        return Action.getNextActions(this, skipValves);
    }

    static getNextActions = function*(action: OpenValve, skipValves: Valve[] = []): Iterable<Action> {
        for (const [valve, distance] of action.valve.distanceTo.entries()) {
            if (!skipValves.includes(valve)) {
                yield new OpenValve(valve, distance + 1);
            }
        }
    }
}

export class Start extends Action {
    constructor(valve: Valve) {
        super(valve, 0);
    }
}

export class ElephantTraining extends Action {
    constructor(valve: Valve) {
        super(valve, 4);
    }
}

export class OpenValve extends Action {
    getAddedFlowRate(): number {
        return this.valve.flowRate;
    }
}
