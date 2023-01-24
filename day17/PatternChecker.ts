type PatternCheckerResult<T> = { found: false } | { found: true, pattern: T[] };

export class PatternChecker<T> {
    readonly repeatsCount;
    readonly minLength;

    constructor(options: {repeatsCount?: number, minLength?: number}) {
        this.repeatsCount = options.repeatsCount || 1;
        this.minLength = options.minLength || 1;
    }

    check(list: T[]): PatternCheckerResult<T> {
        const limit = Math.floor(list.length / (this.repeatsCount + 1));
        for (let i = this.minLength; i <= limit; i++) {
            const pattern = list.slice(i * -1);
            if (this.checkPattern(list, pattern)) {
                return { found: true, pattern };
            }
        }

        return { found: false };
    }

    private checkPattern(list: T[], pattern: T[]): boolean {
        for (let repeat = 1; repeat <= this.repeatsCount; repeat++) {
            const startIndexB = (list.length) - (pattern.length * (repeat + 1));
            for (let index = 0; index < pattern.length; index++) {
                const indexA = startIndexB + index;
                const valueA = list.at(indexA);
                const valueB = pattern.at(index);
                if (valueA !== valueB) return false;
            }
        }

        return true;
    }
}
