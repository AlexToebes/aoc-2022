import {Point} from "./Point";

export enum KnotMoveDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT,
}

export class Knot {
    constructor(public point: Point, readonly next: Knot | null) {}

    getKnot(i: number): Knot | null {
        if (i === 0) return this;
        return this.next ? this.next.getKnot(i - 1) : null;
    }

    getHistory() {
        return this.point.getHistory();
    }

    getHistoryDistinct() {
        return this.getHistory()
            .filter((pointA, i, array) => i === array.findIndex(pointB => pointA.equals(pointB)))
    }

    move(direction: KnotMoveDirection, distance: number = 1) {
        if (distance < 1) return;

        switch (direction) {
            case KnotMoveDirection.UP:
                this.handleMove(0, -1);
                break;
            case KnotMoveDirection.RIGHT:
                this.handleMove(1, 0);
                break;
            case KnotMoveDirection.DOWN:
                this.handleMove(0, 1);
                break;
            case KnotMoveDirection.LEFT:
                this.handleMove(-1, 0);
                break;
        }

        if (distance > 1) this.move(direction, distance - 1);
    }

    private handleMove(x: number, y: number) {
        this.point = this.point.translate(x, y);
        if (this.next) this.next.follow(this);
    }

    private follow(knot: Knot) {
        const {dX, dY} = this.point.distance(knot.point);
        if (dX > 1 || dX < -1 || dY > 1 || dY < -1) {
            const x = dX === 0 ? 0 : dX / Math.abs(dX);
            const y = dY === 0 ? 0 : dY / Math.abs(dY);
            this.handleMove(x, y);
        }
    }

    static createRope(point: Point, length: number): Knot {
        if (length < 1) throw new Error('Can not create a rope with a length smaller than 1');
        return new Knot(point, length > 1 ? Knot.createRope(point, length - 1) : null);
    }
}
