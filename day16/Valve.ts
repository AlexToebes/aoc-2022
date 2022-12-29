export class Valve {
    readonly distanceTo: Map<Valve, number> = new Map([[this, 0]]);

    constructor(readonly name: string, readonly flowRate: number) {}

    static fromString(input: string) {
        const regex = /^Valve (?<name>\w+) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<tunnels>.*?)$/;

        const lines = input.split(/\r?\n/).filter(line => line);
        const valvesAndTunnels: {valve: Valve, tunnels: string}[] = [];

        for (const line of lines) {
            let match = regex.exec(line);
            if (match === null) {
                continue;
            }

            const {groups} = match;
            const {name, flowRate, tunnels} = groups || {};
            const valve = new Valve(name, parseInt(flowRate));
            valvesAndTunnels.push({valve, tunnels});
        }

        for (const {valve, tunnels} of valvesAndTunnels.values()) {
            for (const name of tunnels.split(',')) {
                const {valve: toValve} = valvesAndTunnels.find(({valve}) => valve.name === name.trim()) || {};
                if (toValve) {
                    valve.distanceTo.set(toValve, 1);
                }
            }
        }

        while(valvesAndTunnels.find(({valve}) => valve.distanceTo.size < valvesAndTunnels.length - 1)) {
            for (const {valve: a} of valvesAndTunnels) {
                for (const [b, distanceAB] of [...a.distanceTo.entries()]) {
                    for (const [c, distanceBC] of [...b.distanceTo.entries()]) {
                        const distanceAC = a.distanceTo.get(c) || Infinity;
                        const newDistanceAC = distanceAB + distanceBC;
                        if (newDistanceAC < distanceAC) {
                            a.distanceTo.set(c, newDistanceAC);
                        }
                    }
                }
            }
        }

        return valvesAndTunnels.map(({valve}) => valve);
    }
}
