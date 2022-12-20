import {promises as fsPromises} from "fs";
import {join as pathJoin} from "path";
import {List} from "./List";

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
            .map(([left, right]) => left.validateOrder(right))
            .reduce((sum, isValidOrder, index) => isValidOrder ? sum + index + 1 : sum, 0),
        challenge2: null,
    });

// })(fsPromises.readFile(pathJoin(__dirname, 'input.txt'), 'utf-8'))
})(`
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`)
