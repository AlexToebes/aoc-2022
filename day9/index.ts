import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Knot, KnotMoveDirection} from "./Knot";
import {Point} from "./Point";

(async (input) => {
    const lines = (await input).split(/\r?\n/).filter(line => line);

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

    console.log({
        challenge1: head.getKnot(1)?.getHistoryDistinct().length,
        challenge2: head.getKnot(9)?.getHistoryDistinct().length,
    });

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
