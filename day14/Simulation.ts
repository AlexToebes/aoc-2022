import {Rock} from "./Rock";
import {Point} from "./Point";
import {IElement} from "./IElement";
import {Sand} from "./Sand";

export class Simulation implements Iterator<IElement[]>, Iterable<IElement[]> {
    constructor(public elements: IElement[]) {}

    next(...args: []): IteratorResult<IElement[], any> {
        let movedElements = [];
        for (const element of this.elements) {
            if (element.step(this)) movedElements.push(element);
        }
        return {value: movedElements};
    }

    [Symbol.iterator](): Iterator<IElement[], any, undefined> {
        return this;
    }

    step() {
    }

    getElementAt(point: Point) {
        for (const element of this.elements) {
            if (element.existsAt(point)) return element;
        }
        return null;
    }

    render(from: Point, to: Point) {
        let result = '';
        for (let y = from.y; y <= to.y; y++) {
            for (let x = from.x; x <= to.x; x++) {
                const current = new Point(x, y);
                const element = this.elements.find(element => element.existsAt(current));

                if (element instanceof Rock) {
                    result += '#';
                } else if (element instanceof Sand) {
                    result += 'o';
                } else {
                    result += '.';
                }
            }
            result += '\n'
        }
        return result;
    }
}
