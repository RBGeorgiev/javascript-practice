import { MAP_1 } from './map_1.js';

export default class Map {
    constructor() {
        this.map = MAP_1

        this.track = [
            ...this.map.outerLines,
            ...this.map.innerLines
        ];

        this.gates = [
            ...this.map.gates
        ]
    }

    drawTrack(ctx) {
        const outer = this.map.outerLines,
            inner = this.map.innerLines;

        this.drawLines(ctx, outer);
        this.drawLines(ctx, inner);
    }

    drawGates(ctx) {
        const gates = this.map.gates;
        this.drawLines(ctx, gates, "#18f051");
    }

    drawLines(ctx, lines, color = "#000000") {
        ctx.beginPath();
        for (let i = 0; i < lines.length; i++) {
            ctx.moveTo(lines[i].x1, lines[i].y1);
            ctx.lineTo(lines[i].x2, lines[i].y2);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}