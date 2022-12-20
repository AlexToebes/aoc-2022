export interface IPacketData {
    validateOrder(right: IPacketData | undefined): boolean;
}
