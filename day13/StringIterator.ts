export class StringIterator implements Iterable<string>, Iterator<string> {
    constructor(
        private string: string,
        private offset: number = 0,
    ) {}

    [Symbol.iterator]() {
        return this;
    }

    next(...args: [] | [undefined]): IteratorResult<string, any> {
        if (this.string.length <= this.offset) return this.return();
        return { value: this.string.charAt(this.offset++) };
    }

    return(value?: any): IteratorResult<string, any> {
        return {
            done: true,
            value: undefined,
        }
    }

    throw(e?: any): IteratorResult<string, any> {
        return this.return();
    }

    static concat = function*(...iterators: Iterable<string>[]) {
        for (const iterator of iterators) {
            for (const char of iterator) {
                yield char;
            }
        }
    }
}
