import {Challenge, challenges} from "../helpers";
import {Knot, KnotMoveDirection} from "./Knot";
import {Point} from "./Point";


const challenge1: Challenge = (input) => {
    const lines = input.split(/\r?\n/).filter(line => line);

    const head = Knot.createRope(Point.origin(), 2);

    for (const line of lines) {
        const [direction, distanceString] = line.split(' ');
        const distance = parseInt(distanceString);
        switch (direction) {
            case 'U':
                head.move(KnotMoveDirection.UP, distance)
                break;
            case 'R':
                head.move(KnotMoveDirection.RIGHT, distance)
                break;
            case 'D':
                head.move(KnotMoveDirection.DOWN, distance)
                break;
            case 'L':
                head.move(KnotMoveDirection.LEFT, distance)
                break;
        }
    }

    return head.getKnot(1)?.getHistoryDistinct().length;
};

const challenge2: Challenge = (input) => {
    const lines = input.split(/\r?\n/).filter(line => line);

    const head = Knot.createRope(Point.origin(), 10);

    for (const line of lines) {
        const [direction, distanceString] = line.split(' ');
        const distance = parseInt(distanceString);
        switch (direction) {
            case 'U':
                head.move(KnotMoveDirection.UP, distance)
                break;
            case 'R':
                head.move(KnotMoveDirection.RIGHT, distance)
                break;
            case 'D':
                head.move(KnotMoveDirection.DOWN, distance)
                break;
            case 'L':
                head.move(KnotMoveDirection.LEFT, distance)
                break;
        }
    }

    return head.getKnot(9)?.getHistoryDistinct().length;
};

challenges(__dirname, {
    challenge1,
    challenge2
})
