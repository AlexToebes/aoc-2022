export enum ValidationResult {
    Good,
    Maybe,
    Bad,
}

export interface IPacketData{
    validate(right: IPacketData | undefined): ValidationResult;
    toString(): string;
}
