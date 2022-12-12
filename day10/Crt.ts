import {CpuCycleOutput} from "./Cpu";

export class Crt implements Iterator<string, any, number> {
    private totalPixels: number;
    private cycle: number = 0;

    constructor(private width: number, private height: number) {
        this.totalPixels = width * height;
    }

    next(x: number): IteratorResult<string, any> {
        this.cycle++;
        const rowI = (this.cycle - 1) % this.width
        const value = [x - 1, x, x + 1].includes(rowI);

        return {
            done: false,
            value: this.renderValue(value, !rowI),
        };
    }

    renderValue(value: boolean, prependNewline: boolean = false) {
        return (prependNewline ? '\n' : '') + (value ? `⬜` : `⬛`);
    }
}
