import {IElement} from "./IElement";
import {Point} from "./Point";
import {Simulation} from "./Simulation";

export class Sand implements IElement{
    hasSettled: boolean = false;
    prevPoint?: Point;

    constructor(public point: Point) {}

    existsAt(point: Point): boolean {
        return this.point.equals(point);
    }

    step(simulation: Simulation): boolean {
        if(this.hasSettled) return false;

        const nextMoves = [
            this.point.translate(0, 1),
            this.point.translate(-1, 1),
            this.point.translate(1, 1),
        ];
        for (const move of nextMoves) {
            if (!simulation.getElementAt(move)) {
                this.prevPoint = this.point;
                this.point = move;
                return true;
            }
        }
        this.hasSettled = true;
        return false;
    }
}
