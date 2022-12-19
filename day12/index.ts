import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Graph} from "./Graph";
import {Vertex} from "./Vertex";

(async (input) => {
    const grid = (await input)
        .split(/\r?\n/)
        .filter(line => line)
        .map(row => [...row].map(char => Vertex.fromChar(char)));

    const graph = Graph.fromAdjacencyMatrix(grid, (a, b) => a.height >= b.height - 1);

    const startVertex = graph.vertices.find(vertex => vertex.isStart);
    const endVertex = graph.vertices.find(vertex => vertex.isEnd);

    if (!startVertex) throw new Error('Missing start vertex.');
    if (!endVertex) throw new Error('Missing end vertex.');

    console.log({
        challenge1: graph.getShortestPath(startVertex, endVertex).length - 1,
        challenge2: graph.vertices
            .filter(vertex => vertex.height === Vertex.fromChar('a').height)
            .map(startVertex => graph.getShortestPath(startVertex, endVertex).length - 1)
            .filter(path => path > 0)
            .reduce((fewestSteps, steps) => fewestSteps > steps ? steps : fewestSteps)
    });

    // console.log(startVertex)
    // console.log(grid.flatMap(row => row).map(vertex => vertex.getEdges()));

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
// })(`
// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi
// `)
