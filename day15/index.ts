import {Challenge, challenges} from "../helpers";
import {Sensor} from "./Sensor";
import {Point} from "./Point";

const challenge1: Challenge = (input) => {
    const sensors = input.split(/\r?\n/).filter(line => line).map(line => Sensor.fromString(line));
    const Y = 2000000;

    let searchMinX = Infinity;
    let searchMaxX = -Infinity;

    for (const sensor of sensors) {
        const sensorRange = sensor.point.getDistance(sensor.closestBeacon.point);
        searchMinX = Math.min(searchMinX, sensor.point.x - sensorRange);
        searchMaxX = Math.max(searchMaxX, sensor.point.x + sensorRange);
    }

    let beaconFreePoints: number = 0;
    for (let x = searchMinX; x <= searchMaxX; x++) {
        const point = new Point(x, Y);

        let isBeaconFree = false;

        for (const sensor of sensors) {
            if (sensor.isAtBeacon(point)) {
                isBeaconFree = false;
                break;
            }
            if (sensor.isBeaconFree(point)) {
                isBeaconFree = true;
                break;
            }
        }

        if (isBeaconFree) beaconFreePoints++;
    }

    return beaconFreePoints;
};

const challenge2: Challenge = (input) => {
    const start = new Point(0, 0);
    const end = new Point(4000000, 4000000);

    const sensors = input.split(/\r?\n/).filter(line => line).map(line => Sensor.fromString(line));

    for (let y = start.y; y <= end.y; y++) {
        for (let x = start.x; x <= end.x; x++) {
            const point = new Point(x, y);
            const sensor = sensors.find(sensor => sensor.isAtBeacon(point) || sensor.isBeaconFree(point));

            if (!sensor) {
                return (point.x * 4000000) + point.y;
            }

            x = sensor.point.x + sensor.getBeaconDistance() - Math.abs(sensor.point.y - y);
        }
    }
};

challenges(__dirname, {
    challenge1,
    challenge2
})
