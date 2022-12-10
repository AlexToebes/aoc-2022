export class Point {
    constructor(
        readonly x: number = 0,
        readonly y: number = 0,
        readonly previousPoint: Point | null = null) {}

    translate(x: number, y: number) {
        return new Point(this.x + x, this.y + y, this);
    }

    distance(to: Point) {
        return {
            dX: to.x - this.x,
            dY: to.y - this.y,
        }
    }

    getHistory(): Point[] {
        const previousHistory = this.previousPoint ? this.previousPoint.getHistory() : [];
        return [...previousHistory, this];
    }

    equals(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    static origin() {
        return new Point();
    }
}
