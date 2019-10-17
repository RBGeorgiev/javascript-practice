import { MAP_1 } from './map_1.js';

export default function Map() {
    this.map = MAP_1

    this.track = [
        ...this.map.outerLines,
        ...this.map.innerLines
    ];

    this.gates = [
        ...this.map.gates
    ]

    this.drawTrack = function (ctx) {
        let outer = this.map.outerLines,
            inner = this.map.innerLines;

        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < outer.length; i++) {
            ctx.moveTo(outer[i].x1, outer[i].y1);
            ctx.lineTo(outer[i].x2, outer[i].y2);
        }
        for (let i = 0; i < inner.length; i++) {
            ctx.moveTo(inner[i].x1, inner[i].y1);
            ctx.lineTo(inner[i].x2, inner[i].y2);
        }
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    }

    this.drawGates = function (ctx) {
        let gates = this.map.gates;

        ctx.beginPath();
        for (let i = 0; i < gates.length; i++) {
            ctx.moveTo(gates[i].x1, gates[i].y1);
            ctx.lineTo(gates[i].x2, gates[i].y2);
        }
        ctx.strokeStyle = "#18f051";
        ctx.stroke();
    }
}