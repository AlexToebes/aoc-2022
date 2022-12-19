import {Vertex} from "./Vertex";

type SearchResult = {
    vertex: Vertex,
    visited: boolean,
    weight: number,
    via?: Vertex,
}

export class DijkstraPathfinder {
    readonly queue: Map<Vertex, SearchResult>;

    constructor(vertices: Vertex[], start: Vertex) {
        this.queue = new Map(vertices.map(vertex => [vertex, {
            vertex,
            visited: false,
            weight: start === vertex ? 0 : Infinity,
        }]));
    }
    
    search(end: Vertex): Vertex[] {
        let current = this.getNextInQueue();
        while (current) {
            const {vertex, weight} = current;
            if (vertex === end) return this.createPath(current);

            const edges = vertex.getEdges()
                .map(edge => this.queue.get(edge))
                .filter(edge => edge) as SearchResult[];

            for (const edge of edges) {
                const newWeight = weight + vertex.getEdgeWeight(edge.vertex);
                if (edge.weight <= newWeight) continue;
                this.queue.set(edge.vertex, { ...edge, weight: newWeight, via: vertex });
            }

            this.queue.set(vertex, { ...current, visited: true });
            current = this.getNextInQueue();
        }
        return [];
    }

    private getNextInQueue(): SearchResult | undefined {
        let bestNext: SearchResult | undefined;
        for (const searchData of this.queue.values()) {
            if (searchData.visited) continue;
            if (bestNext && bestNext.weight <= searchData.weight) continue;
            bestNext = searchData;
        }
        return bestNext;
    }

    private createPath(current: SearchResult): Vertex[] {
        const {vertex, via} = current;
        const next = via && this.queue.get(via);
        return next ? [...this.createPath(next), vertex] : [vertex];
    }
}
