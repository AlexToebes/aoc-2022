export type CpuCycleOutput = {
    cycle: number,
    x: number
};

export class Cpu implements Iterable<CpuCycleOutput> {
    private cycle: number = 0;
    private x: number = 1;

    constructor(private instructions: string[]) {}

    *[Symbol.iterator](): Iterator<CpuCycleOutput> {
        for (const instruction of this.instructions) {
            const [command, value] = instruction.split(' ');

            switch (command) {
                case 'noop':
                    yield this.cycleOutput();
                    continue;
                case 'addx':
                    yield this.cycleOutput();
                    yield this.cycleOutput();
                    this.x = this.x + parseInt(value);
                    continue;
                default:
                    throw new Error(`Unknown instruction "${instruction}"`);
            }
        }
    }

    private cycleOutput() {
        this.cycle++;
        return {
            cycle: this.cycle,
            x: this.x,
        }
    }
}
