type MathConstructor = (string: string) => MathCalculator;
type MathCalculator = (variables: {[key: string]: number}) => number;

export const simpleMathParser: MathConstructor = (string: string) => {
    const regex = /\s*(?<valueA>\S+)\s*(?<operator>\S+)\s*(?<valueB>\S+)\s*$/;
    let m;

    if ((m = regex.exec(string)) !== null) {
        const {groups} = m;
        const {valueA, operator: operatorValue, valueB} = groups || {};

        const operator: (a: number, b: number) => number = operators[operatorValue];
        if (!operator) throw new Error(`mathParser: Unknown operator "${string}"`);

        const a = variableParser(valueA);
        const b = variableParser(valueB);

        return (variables) => operator(a(variables), b(variables))
    }
    throw new Error(`mathParser: Unable to parse "${string}"`)
}

const variableParser: MathConstructor = (string) => {
    const isNumber = /^\d+$/.test(string);
    if (isNumber) return () => parseFloat(string);
    return (variables) => variables[string];
}

const operators: {[key: string]: (a: number, b: number) => number } = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
}
