export class StringIterator implements Iterator<string>, Iterable<string>{
    private offset = 0;

    constructor(private string: string) {}

    next(...args: []): IteratorResult<string, any> {
        const value = this.string.charAt(this.offset++);

        return value !== ''
            ? { value }
            : { done: true, value: undefined };
    }

    [Symbol.iterator](): Iterator<string> {
        return this;
    }
}
