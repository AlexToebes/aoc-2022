import {PointCluster} from "./PointCluster";
import {Point} from "./Point";

export class Rock extends PointCluster{
    isResting: boolean = false;

    static rockType0(x: number, y: number) {
        return new Rock([
            new Point(x - 1, y),
            new Point(x, y),
            new Point(x + 1, y),
            new Point(x + 2, y),
        ]);
    }
}