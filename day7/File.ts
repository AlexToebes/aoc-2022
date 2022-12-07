import {IFsEntry} from "./IFsEntry";
import {Directory} from "./Directory";

export class File implements IFsEntry{

    constructor(private parent: Directory, readonly name: string, private size: number) {
    }

    getParent(): Directory | null {
        return this.parent;
    }

    getSize(): number {
        return this.size;
    }

}