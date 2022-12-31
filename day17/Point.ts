export class Point {
    constructor(readonly x: number, readonly y: number) {}

    equals(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    translate(x: number, y: number) {
        return new Point(this.x + x, this.y + y);
    }
}

export class PointCluster {
    readonly boundingBox: PointRange;

    constructor(readonly points: Point[]) {
        this.boundingBox = PointRange.fromPoints(points);
    }

    translate(x: number, y: number) {
        return new PointCluster(this.points.map(point => point.translate(x, y)));
    }

    intersects(target: Point | PointCluster): boolean {
        if (target instanceof Point) {
            return this.points.some(clusterPoint => clusterPoint.equals(target));
        }
        if (target instanceof PointCluster) {
            if (!this.boundingBox.intersects(target.boundingBox)) return false;
            return this.points.some(clusterPoint => target.intersects(clusterPoint));
        }
        return false;
    }
}

export class PointRange {
    readonly from: Point;
    readonly to: Point;

    constructor(from: Point, to: Point) {
        this.from = new Point(Math.min(from.x, to.x), Math.min(from.y, to.y));
        this.to = new Point(Math.max(from.x, to.x), Math.max(from.y, to.y));
    }

    intersects(target: PointRange): boolean {
        if (target instanceof PointRange) {
            return this.to.x >= target.from.x
                && this.from.x <= target.to.x
                && this.from.y <= target.to.y
                && this.to.y >= target.from.y;
        }
        return false;
    }

    static fromPoints(points: Point[]) {
        const minX = points.reduce((min, {x}) => Math.min(min, x), Infinity);
        const minY = points.reduce((min, {y}) => Math.min(min, y), Infinity);
        const maxX = points.reduce((max, {x}) => Math.max(max, x), -Infinity);
        const maxY = points.reduce((max, {y}) => Math.max(max, y), -Infinity);
        return new PointRange(new Point(minX, minY), new Point(maxX, maxY))
    }
}
