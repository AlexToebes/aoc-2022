import {Point} from "./Point";
import {Simulation} from "./Simulation";

export interface IElement {
    existsAt(point: Point): boolean;
    step(simulation: Simulation): boolean;
}
