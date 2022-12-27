import {Challenge, challenges} from "../helpers";
import {Root} from "./Root";
import {Directory} from "./Directory";
import {File} from "./File";


const challenge1: Challenge = (input) => {
    const fileRegex = /^(\d+) (\S+)$/;

    const lines = input.split(/\r?\n/).filter(line => line);

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

    return root.getDirectoriesRecursive()
        .filter(dir => dir.getSize() <= 100000)
        .reduce((sum, dir) => sum + dir.getSize(), 0)
};

const challenge2: Challenge = (input) => {
    const fileRegex = /^(\d+) (\S+)$/;

    const lines = input.split(/\r?\n/).filter(line => line);

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

    const totalDiskSpace = 70000000;
    const usedSpace = root.getSize();
    const targetFreeDiskSpace = 30000000;

    const dirsSorted = root.getDirectoriesRecursive().sort((a, b) => a.getSize() - b.getSize());

    for (const directory of dirsSorted) {
        if (totalDiskSpace - usedSpace + directory.getSize() >= targetFreeDiskSpace) {
            return directory.getSize();
        }
    }
};

challenges(__dirname, {
    challenge1,
    challenge2
})
