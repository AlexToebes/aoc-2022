import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Grid} from "./Grid";

(async (input) => {
    const grid = Grid.fromString(await input);

    let visibleTrees = 0;
    const trees = grid.getTrees();
    for (const tree of trees) {
        if (tree.isVisibleFromOutside(grid)) visibleTrees = visibleTrees + 1;
    }

    const sortedTrees = trees.sort((a, b) => b.getScenicScore(grid) - a.getScenicScore(grid));

    console.log({
        visibleTrees,
        highestScenicScore: sortedTrees[0].getScenicScore(grid),
    });

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
