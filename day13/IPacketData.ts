export enum ValidationResult {
    Bad = 1,
    Maybe = 0,
    Good = -1,
}

export interface IPacketData{
    validate(right: IPacketData | undefined): ValidationResult;
    toString(): string;
}
