import {Challenge, challenges} from "../helpers";
import {Graph} from "./Graph";
import {Vertex} from "./Vertex";

const challenge1: Challenge = (input) => {
    const grid = input
        .split(/\r?\n/)
        .filter(line => line)
        .map(row => [...row].map(char => Vertex.fromChar(char)));

    const graph = Graph.fromAdjacencyMatrix(grid, (a, b) => a.height >= b.height - 1);

    const startVertex = graph.vertices.find(vertex => vertex.isStart);
    const endVertex = graph.vertices.find(vertex => vertex.isEnd);

    if (!startVertex) throw new Error('Missing start vertex.');
    if (!endVertex) throw new Error('Missing end vertex.');

    return graph.getShortestPath(startVertex, endVertex).length - 1;
};

const challenge2: Challenge = (input) => {
    const grid = input
        .split(/\r?\n/)
        .filter(line => line)
        .map(row => [...row].map(char => Vertex.fromChar(char)));

    const graph = Graph.fromAdjacencyMatrix(grid, (a, b) => a.height >= b.height - 1);

    const startVertex = graph.vertices.find(vertex => vertex.isStart);
    const endVertex = graph.vertices.find(vertex => vertex.isEnd);

    if (!startVertex) throw new Error('Missing start vertex.');
    if (!endVertex) throw new Error('Missing end vertex.');

    return graph.vertices
        .filter(vertex => vertex.height === Vertex.fromChar('a').height)
        .map(startVertex => graph.getShortestPath(startVertex, endVertex).length - 1)
        .filter(path => path > 0)
        .reduce((fewestSteps, steps) => fewestSteps > steps ? steps : fewestSteps)
};


challenges(__dirname, {
    challenge1,
    challenge2
})
