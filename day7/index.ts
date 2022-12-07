import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {Root} from "./Root";
import {Directory} from "./Directory";
import {File} from "./File";

(async (input) => {
    const fileRegex = /^(\d+) (\S+)$/;

    const lines = (await input).split(/\r?\n/).filter(line => line);

    const root = new Root();
    let pointer: Directory = root;

    for (const line of lines) {
        if (line.startsWith('$')) {
            if (line.startsWith('$ cd /')) { pointer = root; continue; }
            if (line.startsWith('$ cd')) {
                const name = line.substring(5);
                const dir = pointer.getDirectory(name);
                if (dir) {
                    pointer = dir;
                    continue;
                }
                throw new Error(`Folder "${name}" not found`);
            }
            if (line.startsWith('$ ls')) { continue; }
            throw new Error(`Unhandled command: "${line}"`);
        }

        if (line.startsWith('dir')) {
            pointer.addEntry(new Directory(pointer, line.substring(4)))
            continue;
        }

        let m ;
        if ((m = fileRegex.exec(line)) !== null) {
            const {1: sizeString, 2: name} = m;
            const size = parseInt(sizeString);
            pointer.addEntry(new File(pointer, name, size));
            continue;
        }

        throw new Error(`Unhandled output: "${line}"`);
    }

    // console.log(
    //     root.getDirectoriesRecursive()
    //         .filter(dir => dir.getSize() <= 100000)
    //         .reduce((sum, dir) => sum + dir.getSize(), 0)
    // );

    const totalDiskSpace = 70000000;
    const usedSpace = root.getSize();
    const targetFreeDiskSpace = 30000000;

    const dirsSorted = root.getDirectoriesRecursive().sort((a, b) => a.getSize() - b.getSize());

    for (const directory of dirsSorted) {
        // console.log(directory.getSize(), totalDiskSpace - usedSpace + directory.getSize() >= targetFreeDiskSpace);
        if (totalDiskSpace - usedSpace + directory.getSize() >= targetFreeDiskSpace) {
            console.log(directory.getSize());
            break;
        }
    }


})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
