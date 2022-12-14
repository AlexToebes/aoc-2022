import {Challenge, challenges} from "../helpers";


const challenge1: Challenge = (input) => {
    const [line] = input.split(/\r?\n/).filter(line => line);

    const hasDuplicates = function<T>(list: T[]) {
        const history: T[] = [];
        for (const item of list) {
            if (history.includes(item)) return true;
            history.push(item);
        }
        return false;
    }

    const findDistinctChars = function* (stream: string, amount: number, offset: number = 0) {
        const charHistory: string[] = [];

        for (let i = offset; i < stream.length; i++) {
            const char = stream.charAt(i);
            if (charHistory.length >= amount) charHistory.shift();
            charHistory.push(char);

            if (charHistory.length >= amount && !hasDuplicates(charHistory)) yield i + 1;
        }
    }

    const packageStart = findDistinctChars(line ,4);

    const {value} = packageStart.next();

    return value;
};

const challenge2: Challenge = (input) => {
    const [line] = input.split(/\r?\n/).filter(line => line);

    const hasDuplicates = function<T>(list: T[]) {
        const history: T[] = [];
        for (const item of list) {
            if (history.includes(item)) return true;
            history.push(item);
        }
        return false;
    }

    const findDistinctChars = function* (stream: string, amount: number, offset: number = 0) {
        const charHistory: string[] = [];

        for (let i = offset; i < stream.length; i++) {
            const char = stream.charAt(i);
            if (charHistory.length >= amount) charHistory.shift();
            charHistory.push(char);

            if (charHistory.length >= amount && !hasDuplicates(charHistory)) yield i + 1;
        }
    }

    const messageStart = findDistinctChars(line ,14);

    const {value} = messageStart.next();

    return value;
};

challenges(__dirname, {
    challenge1,
    challenge2
})
