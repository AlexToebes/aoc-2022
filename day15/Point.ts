export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    getDifference(to: Point) {
        return {
            dX: to.x - this.x,
            dY: to.y - this.y,
        }
    }

    getDistance(from: Point) {
        const {dX, dY} = this.getDifference(from);
        return Math.abs(dX) + Math.abs(dY);
    }

    toString() {
        return `Point(x: ${this.x}, y: ${this.y})`;
    }

    static fromString(input: string) {
        const [x,y] = input.trim().split(',').map(string => parseInt(string));
        if (isNaN(x) || isNaN(y)) {
            throw new Error(`Unable to parse "${input}" to a Point.`);
        }
        return new Point(x, y);
    }
}
