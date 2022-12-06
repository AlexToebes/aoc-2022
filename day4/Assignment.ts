export class Assignment {
    constructor(public readonly sectionsToClean: number[]) {}

    contains(assignment: Assignment) {
        return this.intersections(assignment).filter(i => !i).length < 1;
    }

    overlaps(assignment: Assignment) {
        return this.intersections(assignment).filter(i => i).length > 0;
    }

    intersections(assignment: Assignment) {
        return assignment.sectionsToClean.map(section => {
            return this.sectionsToClean.includes(section)
        });
    }

    static fromRange(start: number, end: number) {
        const sections: number[] = [];
        for (let i = start; i <= end; i++) {
            sections.push(i);
        }
        return new Assignment(sections);
    }

    static fromString(string: string) {
        const [start, end] = string.split('-');
        if (!start || !end) throw new Error(`Invalid range: "${start}" - "${end}"`);
        return Assignment.fromRange(parseInt(start), parseInt(end))
    }
}
