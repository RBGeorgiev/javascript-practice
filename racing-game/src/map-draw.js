export default function Map() {
    this.draw = function (ctx, map) {
        let outer = map.outerLines,
            inner = map.innerLines;

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
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath()
    }
}