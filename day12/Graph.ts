import {Vertex} from "./Vertex";
import {DijkstraPathfinder} from "./PathFinder";

export class Graph {
    constructor(readonly vertices: Vertex[]) {}

    getShortestPath(from: Vertex, to: Vertex) {
        return new DijkstraPathfinder(this.vertices, from).search(to);
    }

    static fromAdjacencyMatrix(
        grid: Vertex[][],
        hasEdge: (from: Vertex, to: Vertex) => boolean,
    ) {
        for (let rowI = 0; rowI < grid.length; rowI++) {
            for (let colI = 0; colI < grid[rowI].length; colI++) {
                const vertex = grid[rowI][colI];
                vertex.addEdges([
                    grid[rowI - 1] && grid[rowI - 1][colI], // North
                    grid[rowI][colI + 1], // East
                    grid[rowI + 1] && grid[rowI + 1][colI], // South
                    grid[rowI][colI - 1], // West;
                ].filter(candidate => candidate && hasEdge(vertex, candidate)));

            }
        }

        return new Graph(grid.flatMap(row => row))
    }
}
