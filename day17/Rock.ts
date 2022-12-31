import {Point, PointCluster} from "./Point";

export class Rock{
    isResting: boolean = false;

    constructor(public pointCluster: PointCluster) {}

    move(x: number, y: number) {
        this.pointCluster = this.pointCluster.translate(x, y);
    }

    static createRock(type: number, x: number, y: number) {
        switch (type) {
            case 0:
                return new Rock(new PointCluster([
                    new Point(x, y),
                    new Point(x + 1, y),
                    new Point(x + 2, y),
                    new Point(x + 3, y),
                ]));
            case 1:
                return new Rock(new PointCluster([
                    new Point(x + 1, y + 2),
                    new Point(x, y + 1),
                    new Point(x + 1, y + 1),
                    new Point(x + 2, y + 1),
                    new Point(x + 1, y),
                ]));
            case 2:
                return new Rock(new PointCluster([
                    new Point(x + 2, y + 2),
                    new Point(x + 2, y + 1),
                    new Point(x, y),
                    new Point(x + 1, y),
                    new Point(x + 2, y),
                ]));
            case 3:
                return new Rock(new PointCluster([
                    new Point(x, y + 3),
                    new Point(x, y + 2),
                    new Point(x, y + 1),
                    new Point(x, y),
                ]));
            case 4:
                return new Rock(new PointCluster([
                    new Point(x + 1, y + 1),
                    new Point(x, y + 1),
                    new Point(x + 1, y),
                    new Point(x, y),
                ]));
        }
        throw new Error(`Rock type "${type} not found.`)
    }
}
