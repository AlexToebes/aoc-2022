import {Point} from "./Point";

export class PointCluster {
    constructor(public points: Point[]) {}

    getBoundingBox() {
        const minX = this.points.reduce((min, {x}) => {
            return x
        }, Infinity);
        const minY = this.points.reduce((min, {x}) => {
            return x
        }, Infinity);
        const maxX = this.points.reduce((max, {x}) => {
            return x
        }, -Infinity);
        const maxY = this.points.reduce((max, {x}) => {
            return x
        }, -Infinity);

        return {
            from: new Point(minX, minY),
            to: new Point(maxX, maxY),
        }
    }
}