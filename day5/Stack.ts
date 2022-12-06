export class Stack {
    crates: string[] = [];

    constructor(readonly stackId: number) {
    }

    private push(crate: string) {
        this.crates.push(crate);
    }

    private pop() {
        const popped = this.crates.pop();
        if (!popped) {
            throw new Error(`Stack "${this.stackId}" con not be popped, it already empty.`)
        }
        return popped;
    }

    getTopCrate() {
        return this.crates[this.crates.length - 1] || '';
    }

    static move(amount: number, from: Stack, to: Stack) {
        for (let i = 0; i < amount; i++) {
            to.push(from.pop())
        }
    }

    static move9001(amount: number, from: Stack, to: Stack) {
        const crane = [];
        for (let i = 0; i < amount; i++) {
            crane.push(from.pop());
        }
        for (let i = 0; i < amount; i++) {
            const cranepop = crane.pop();
            if (cranepop) to.push(cranepop);
        }
    }

    static fromString(stackString: string) {
        const stackIdRegex = /\d+/g;
        const cratesRegex = /\w+/g;

        const stackStringLines = stackString.split(/\r?\n/);

        let stackStringPositions: {[key: string]: Stack} = {};

        for (var i = stackStringLines.length - 1; i >= 0; i--) {
            const stackStringLine = stackStringLines[i];

            if (i === stackStringLines.length - 1) {
                // Find all the stacks
                let stackIdMatch;

                while ((stackIdMatch = stackIdRegex.exec(stackStringLine)) !== null) {
                    const {0: stackId, index: stringPosition} = stackIdMatch;
                    stackStringPositions = {
                        ...stackStringPositions,
                        [stringPosition]: new Stack(parseInt(stackId)),
                    };
                }
                continue;
            }

            let cratesMatch;

            while ((cratesMatch = cratesRegex.exec(stackStringLine)) !== null) {
                const {0: crate, index: stringPosition} = cratesMatch;
                stackStringPositions[stringPosition].push(crate);
            }
        }

        return Object.values(stackStringPositions);
    }
}
