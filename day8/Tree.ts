import {Grid} from "./Grid";

export class Tree {
    constructor(
        readonly row: number,
        readonly column: number,
        readonly height: number
    ) {}

    isVisibleBehind(trees: Tree[]) {
        for (const tree of trees) {
            if (tree.height >= this.height) return false;
        }
        return true;
    }

    getViewingDistance(trees: Tree[]) {
        let viewingDistance = 0;
        for (const tree of trees) {
            if (tree.height >= this.height) return viewingDistance + 1;
            viewingDistance = viewingDistance + 1;
        }
        return viewingDistance;
    }

    getTreesAround(grid: Grid) {
        const treeRow = grid.getRow(this.row);
        const treeColumn = grid.getColumn(this.column);

        return {
            left: treeRow.slice(0, this.column).reverse(),
            right: treeRow.slice(this.column + 1),
            top: treeColumn.slice(0, this.row).reverse(),
            bottom: treeColumn.slice(this.row + 1),
        };
    }

    isVisibleFromOutside(grid: Grid) {
        const {left, right, top, bottom} = this.getTreesAround(grid);

        const isVisibleFromLeft = this.isVisibleBehind(left);
        const isVisibleFromRight = this.isVisibleBehind(right);
        const isVisibleFromTop = this.isVisibleBehind(top);
        const isVisibleFromBottom = this.isVisibleBehind(bottom);

        return isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom;
    }

    getScenicScore(grid: Grid) {
        const {left, right, top, bottom} = this.getTreesAround(grid);

        const viewingDistanceLeft = this.getViewingDistance(left);
        const viewingDistanceRight = this.getViewingDistance(right);
        const viewingDistanceTop = this.getViewingDistance(top);
        const viewingDistanceBottom = this.getViewingDistance(bottom);

        return viewingDistanceLeft * viewingDistanceRight * viewingDistanceTop * viewingDistanceBottom;
    }
}
