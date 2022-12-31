import {Rock} from "./Rock";
import {Point} from "./Point";

export type JetPatternElement = {index: number, value: string}

export class RockSimulation  implements Iterator<RockSimulation>, Iterable<RockSimulation> {
    static width = 7;
    static newRockDistance = 3;

    private nextRockType = 0;
    readonly rocks: Rock[] = [];
    readonly jetPattern: Iterator<JetPatternElement>

    constructor(jetPattern: string) {
        this.jetPattern = RockSimulation.jetGenerator(jetPattern)[Symbol.iterator]();
    }

    [Symbol.iterator](): Iterator<RockSimulation> {
        return this;
    }

    next(...args: []): IteratorResult<RockSimulation, any> {
        const fallingRock = this.rocks.find(rock => !rock.isResting);

        if (!fallingRock) {
            const maxY = this.rocks.reduce((maxY, rock) => Math.max(maxY, rock.pointCluster.boundingBox.to.y), 0);
            this.rocks.push(Rock.createRock(this.nextRockType, 2 , maxY + RockSimulation.newRockDistance + 1))
            this.nextRockType = (this.nextRockType + 1) % 5;
            return {value: this};
        }

        const jetPattern = this.jetPattern.next().value as JetPatternElement;

        if (jetPattern.value === '<' && this.canMove(fallingRock, -1, 0)) fallingRock.move(-1, 0);
        if (jetPattern.value === '>' && this.canMove(fallingRock, 1, 0)) fallingRock.move(1, 0);

        if (this.canMove(fallingRock, 0, -1)) {
            fallingRock.move(0, -1);
            return {value: this};
        }

        fallingRock.isResting = true;
        return {value: this};
    }

    canMove(rock: Rock, x: number, y: number) {
        const futurePointCluster = rock.pointCluster.translate(x, y);

        if (futurePointCluster.boundingBox.from.y <= 0) return false;
        if (futurePointCluster.boundingBox.from.x < 0) return false;
        if (futurePointCluster.boundingBox.to.x >= RockSimulation.width) return false;

        return !this.rocks.some((otherRock) => rock !== otherRock && futurePointCluster.intersects(otherRock.pointCluster));
    }

    toString() {
        let result = [];
        const maxY = this.rocks.reduce((maxY, rock) => Math.max(maxY, rock.pointCluster.boundingBox.to.y), 0);
        for (let y = maxY; y > 0; y--) {
            let line = '';

            for (let x = -1; x < RockSimulation.width + 1; x++) {
                if (x < 0 || RockSimulation.width <= x) {
                    line += '|';
                    continue;
                }

                const point = new Point(x, y);
                const rock = this.rocks.find(rock => rock.pointCluster.intersects(point));
                if (rock) {
                    line += rock.isResting ? '#' : '@';
                    continue;
                }

                line += '.';
            }

            result.push(line);
        }

        return [
            ...result,
            `+${new Array(RockSimulation.width).fill('-').join('')}+`,
        ].join('\n');
    }

    static jetGenerator = function*(jetPattern: string): Iterable<JetPatternElement> {
        for (const [index, value] of [...jetPattern].entries()) {
            yield {index, value };
        }
        yield* RockSimulation.jetGenerator(jetPattern);
    }
}
