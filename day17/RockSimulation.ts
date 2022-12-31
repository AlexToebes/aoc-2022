import {Rock} from "./Rock";

export class RockSimulation  implements Iterator<Rock[]>, Iterable<Rock[]> {
    static width = 7;
    static newRockDistance = 3;

    readonly rocks: Rock[] = [];

    [Symbol.iterator](): Iterator<Rock[]> {
        return this;
    }

    next(...args: []): IteratorResult<Rock[], any> {
        return this;
    }

}