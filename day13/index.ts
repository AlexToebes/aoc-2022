import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {List} from "./List";
import {ValidationResult} from "./IPacketData";

export type PacketPair = [List, List];

(async (input) => {
    const lines = (await input).split(/\r?\n/);

    const packetPairs: PacketPair[] = [];
    let packetPair: List[] = [];
    for (const line of lines) {
        if (line.trim() === '') {
            if (packetPair.length === 2) packetPairs.push(packetPair as PacketPair);
            packetPair = [];
            continue;
        }
        packetPair.push(List.fromString(line));
    }

    console.log({
        challenge1: packetPairs
            .map(([left, right]) => left.validate(right) === ValidationResult.Good)
            .reduce((sum, isValidOrder, index) => isValidOrder ? sum + index + 1 : sum, 0),
        challenge2: null,
    });

})(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
