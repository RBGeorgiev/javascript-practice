export default function drawLines(ctx, lines, color = "#000000") {
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
}