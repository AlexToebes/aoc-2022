import {Valve} from "./Valve";

export abstract class Action {
    constructor(readonly valve: Valve, readonly duration: number) {}

    getAddedFlowRate(): number {
        return 0;
    }

    getNextActions(): Iterable<Action> {
        return Action.getNextActions(this);
    }

    static getNextActions = function*(action: OpenValve): Iterable<Action> {
        for (const [valve, distance] of action.valve.distanceTo.entries()) {
            yield new OpenValve(valve, distance + 1);
        }
    }
}

export class Start extends Action {
    constructor(valve: Valve) {
        super(valve, 0);
    }
}

export class OpenValve extends Action {
    getAddedFlowRate(): number {
        return this.valve.flowRate;
    }
}
