import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Simulation} from "./Simulation";
import {Rock} from "./Rock";
import {Point} from "./Point";
import {Sand} from "./Sand";

(async (input) => {
    const startTime = performance.now();

    const rocks = (await input)
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => Rock.fromString(line))
        .flatMap(rocks => rocks);

    console.log({
        // challenge1: (() => {
        //     const maxY = rocks.reduce((maxY, rock) => rock.to.y > maxY ? rock.to.y : maxY, 0);
        //     const simulation = new Simulation([...rocks]);
        //
        //     for (const movedElements of simulation) {
        //         if (simulation.elements.find(element => element instanceof Sand && element.point.y > maxY)) {
        //             break;
        //         }
        //
        //         if(movedElements.length < 1) {
        //             simulation.elements.push(new Sand(new Point(500, 0)))
        //             console.log(`Sand: ${simulation.elements.filter(el => el instanceof Sand).length}`);
        //         }
        //     }
        //
        //     return simulation.elements.filter(element => element instanceof Sand).length - 1;
        // })(),
        challenge2: (() => {
            const maxY = rocks.reduce((maxY, rock) => rock.to.y > maxY ? rock.to.y : maxY, 0);

            const floor = new Rock(new Point(-Infinity, maxY + 2), new Point(Infinity, maxY + 2));
            const simulation = new Simulation([floor, ...rocks]);

            let lastSand: Sand | null = null;

            for (const movedElements of simulation) {
                if(movedElements.length < 1) {
                    if (simulation.getElementAt(new Point(500, 0))) {
                        break;
                    }
                    const newSand: Sand = new Sand(lastSand?.prevPoint ||  new Point(500, 0));
                    simulation.elements.push(newSand);

                    console.log(`Sand: ${simulation.elements.filter(el => el instanceof Sand).length}`);

                    lastSand = newSand;
                }
            }

            return simulation.elements.filter(element => element instanceof Sand).length;
        })()
    });

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
// })(`
// 498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9
// `)
