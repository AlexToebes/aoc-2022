import {Directory} from "./Directory";

export interface IFsEntry {
    getParent(): Directory | null;
    getSize(): number;
}