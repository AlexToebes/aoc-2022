import { Tree } from "./Tree"

export class Grid {
    readonly grid: Tree[][]

    constructor(grid: number[][]) {
        this.grid = grid.map((row, rowI) =>
            row.map((height, columnI) =>
                new Tree(rowI, columnI, height)
            )
        );
    }

    getTrees() {
        return this.grid.flatMap(row => row);
    }

    getRow(row: number) {
        return this.grid[row];
    }

    getColumn(column: number) {
        return this.grid.map(row => row[column]);
    }

    static fromString(string: string) {
        return new Grid(
            string
                .split(/\r?\n/)
                .filter(line => line)
                .map(line => [...line].map(char => parseInt(char)))
        )
    }
}
