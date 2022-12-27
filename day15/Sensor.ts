import {Point} from "./Point";
import {Beacon} from "./Beacon";

export class Sensor{

    constructor(public point: Point, public closestBeacon: Beacon) {}

    isAtBeacon(point: Point) {
        return this.closestBeacon.point.equals(point);
    }

    isBeaconFree(point: Point) {
        if (this.isAtBeacon(point)) return false;
        return this.point.getDistance(point) <= this.getBeaconDistance();
    }

    getBeaconDistance() {
        return this.point.getDistance(this.closestBeacon.point);
    }

    static fromString(input: string) {
        const regex = /^Sensor at x=(?<sensorX>.*?), y=(?<sensorY>.*?): closest beacon is at x=(?<beaconX>.*?), y=(?<beaconY>.*?)$/;
        let match;
        if ((match = regex.exec(input)) !== null) {
            const {groups} = match;
            const {sensorX, sensorY, beaconX, beaconY} = groups || {};
            return new Sensor(
                new Point(parseInt(sensorX), parseInt(sensorY)),
                new Beacon(new Point(parseInt(beaconX), parseInt(beaconY))))
        }
        throw new Error(`Unable to parse: ${input}`);
    }
}
