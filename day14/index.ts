import {Simulation} from "./Simulation";
import {Rock} from "./Rock";
import {Point} from "./Point";
import {Sand} from "./Sand";
import {Challenge, challenges} from "../helpers";

const challenge1: Challenge = (input) => {
    const rocks = (input)
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => Rock.fromString(line))
        .flatMap(rocks => rocks);

    const maxY = rocks.reduce((maxY, rock) => rock.to.y > maxY ? rock.to.y : maxY, 0);
    const simulation = new Simulation([...rocks]);

    for (const movedElements of simulation) {
        if (simulation.elements.find(element => element instanceof Sand && element.point.y > maxY)) {
            break;
        }

        if(movedElements.length < 1) {
            simulation.elements.push(new Sand(new Point(500, 0)));
        }
    }

    return simulation.elements.filter(element => element instanceof Sand).length - 1;
};

const challenge2: Challenge = (input) => {
    const rocks = (input)
        .split(/\r?\n/)
        .filter(line => line)
        .map(line => Rock.fromString(line))
        .flatMap(rocks => rocks);

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

            lastSand = newSand;
        }
    }

    return simulation.elements.filter(element => element instanceof Sand).length;
};

challenges(__dirname, {
    challenge1,
    challenge2
})
