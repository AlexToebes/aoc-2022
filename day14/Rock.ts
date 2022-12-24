import {Point} from "./Point";
import {IElement} from "./IElement";
import {Simulation} from "./Simulation";

export class Rock implements IElement{
    public from: Point;
    public to: Point;

    constructor(from: Point, to: Point) {
        const [smallestX, largestX] = from.x < to.x ? [from.x, to.x] : [to.x, from.x];
        const [smallestY, largestY] = from.y < to.y ? [from.y, to.y] : [to.y, from.y];
        this.from = new Point(smallestX, smallestY);
        this.to = new Point(largestX, largestY);
    }

    existsAt(point: Point): boolean {
        return point.x >= this.from.x && this.to.x >= point.x && point.y >= this.from.y && this.to.y >= point.y;
    }

    step(simulation: Simulation): boolean {
        return false;
    }

    static fromString(input: string) {
        let rockStructures: Rock[] = [];
        const points = input.split('->').map(string => Point.fromString(string));
        for (let i = 0; i < points.length - 1; i++) {
            rockStructures = [
                ...rockStructures,
                new Rock(points[i], points[i + 1]),
            ];
        }
        return rockStructures;
    }
}
