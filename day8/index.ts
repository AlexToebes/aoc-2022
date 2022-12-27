import {Challenge, challenges} from "../helpers";
import {Grid} from "./Grid";


const challenge1: Challenge = (input) => {
    const grid = Grid.fromString(input);

    let visibleTrees = 0;
    const trees = grid.getTrees();
    for (const tree of trees) {
        if (tree.isVisibleFromOutside(grid)) visibleTrees = visibleTrees + 1;
    }

    return visibleTrees;
};

const challenge2: Challenge = (input) => {
    const grid = Grid.fromString(input);

    let visibleTrees = 0;
    const trees = grid.getTrees();
    for (const tree of trees) {
        if (tree.isVisibleFromOutside(grid)) visibleTrees = visibleTrees + 1;
    }

    const sortedTrees = trees.sort((a, b) => b.getScenicScore(grid) - a.getScenicScore(grid));

    return sortedTrees[0].getScenicScore(grid);
};

challenges(__dirname, {
    challenge1,
    challenge2
})
