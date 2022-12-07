import {IFsEntry} from "./IFsEntry";

export class Directory implements IFsEntry{
    entries: IFsEntry[] = [];

    constructor(private parent: Directory | null, readonly name: string) {}

    getParent(): Directory | null {
        return this.parent;
    }

    getSize(): number {
        return this.entries.reduce((sum, child) => sum + child.getSize(), 0)
    }

    getDirectory(name: string): Directory | null {
        if (name === '.') return this;
        if (name === '..') return this.getParent();

        for (const directory of this.getDirectories()) {
            if (name === directory.name) return directory;
        }
        return null;
    }

    getDirectories(): Directory[] {
        const directories: Directory[] = [];
        for (const child of this.entries) {
            if (child instanceof Directory) directories.push(child);
        }
        return directories;
    }

    getDirectoriesRecursive(): Directory[] {
        const dirs = this.getDirectories();
        return [...dirs, ...(dirs.flatMap(dir => dir.getDirectoriesRecursive()))];
    }

    addEntry(child: IFsEntry) {
        this.entries.push(child);
    }
}