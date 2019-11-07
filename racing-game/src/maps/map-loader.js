import { MAP_1 } from './map_1.js';
import { MAP_2 } from './map_2.js';
import drawLines from '../draw-lines.js';

export default class Map {
    constructor() {
        this.map = MAP_1;

        this.track = [
            ...this.map.outerLines,
            ...this.map.innerLines
        ];

        this.gates = [
            ...this.map.gates
        ]
    }

    drawTrack(ctx) {
        drawLines(ctx, this.track);
    }

    drawGates(ctx) {
        drawLines(ctx, this.gates, "#18f051");
    }
}