import {Challenge, challenges} from "../helpers";
import {List} from "./List";
import {ValidationResult} from "./IPacketData";

export type PacketPair = [List, List];

const challenge1: Challenge = (input) => {
    const lines = (input).split(/\r?\n/);

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

    return packetPairs
        .map(([left, right]) => left.validate(right) === ValidationResult.Good)
        .reduce((sum, isValidOrder, index) =>
            isValidOrder ? sum + index + 1 : sum, 0);
};

const challenge2: Challenge = (input) => {
    const lines = (input).split(/\r?\n/);

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

    const dividerPackets: List[] = [
        List.fromString('[[2]]'),
        List.fromString('[[6]]'),
    ];

    const packets: List[] = [
        ...dividerPackets,
        ...packetPairs.flatMap(packetPair => packetPair)
    ];

    return packets
        .sort((a, b) => a.validate(b))
        .map((packet, index) => ({
            index: index + 1,
            packet,
            isDivider: dividerPackets.includes(packet)
        }))
        // .map(({index, isDivider, packet}) => console.log(`${index} \t ${isDivider} \t ${packet}`))
        .filter(({isDivider}) => isDivider)
        .map(({index}) => index)
        .reduce((a, b) => a * b);
};

challenges(__dirname, {
    challenge1,
    challenge2
})
