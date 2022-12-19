export class Vertex {
    private edges: Vertex[] = [];
    constructor(
        readonly height: number,
        readonly isStart: boolean = false,
        readonly isEnd: boolean = false,
    ) {}

    addEdges(vertex: Vertex[]) {
        this.edges = [...this.edges, ...vertex];
    };

    getEdges() {
        return this.edges;
    }

    getEdgeWeight(edge: Vertex) {
        return 1;
    }

    static fromChar(char: String) {
        if (char === 'S') return new Vertex('a'.charCodeAt(0), true);
        if (char === 'E') return new Vertex('z'.charCodeAt(0), false, true);
        return new Vertex(char.charCodeAt(0));
    }
}
