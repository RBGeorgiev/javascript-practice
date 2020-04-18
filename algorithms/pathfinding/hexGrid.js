let canvas = document.getElementById("testCanvas");
let ctx = canvas.getContext("2d");
let gridWidth = 51;
let gridHeight = Math.floor(gridWidth / 2);
let size = canvas.width / gridWidth;
canvas.style.border = "1px solid black";

// pointyHexCorner = (x, y, size, i) => {
//     let angle_deg = 60 * i - 30;
//     let angle_rad = Math.PI / 180 * angle_deg;
//     return [x + size * Math.cos(angle_rad), y + size * Math.sin(angle_rad)];
// }

flatHexCorner = (x, y, size, i) => {
    let angle_deg = 60 * i;
    let angle_rad = Math.PI / 180 * angle_deg;
    let cornerX = x + size * Math.cos(angle_rad);
    let cornerY = y + size * Math.sin(angle_rad);
    return (cornerX > canvas.width || cornerY > canvas.height) ? null : [cornerX, cornerY];
}

createHex = (x, y, size) => {
    let points = [];

    for (let i = 0; i < 6; i++) {
        let corner = flatHexCorner(x, y, size, i);
        if (corner === null) return null;
        points.push(corner);
    }

    return points;
}

drawHex = (points) => {
    if (points === null) return;
    for (let i = 0; i < 6; i++) {
        let x = points[i][0];
        let y = points[i][1];
        let dx = points[(i + 1) % 6][0];
        let dy = points[(i + 1) % 6][1];

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(dx, dy);
        ctx.stroke();
    }
}

for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
        let adjustedSize = size / 1.5;

        let w = 2 * adjustedSize;
        let h = Math.sqrt(3) * adjustedSize;
        let posX = (w * 3 / 4) * x
        let posY = h * y;
        let offset = (x % 2 === 1) ? h / 2 : 0;

        let points = createHex(posX + w / 2, posY + h / 2 + offset, adjustedSize);
        drawHex(points);
    }
}