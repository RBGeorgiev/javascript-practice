import { Delaunay } from "./d3-delaunay/index.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const generateRandomPoints = (amount, startX = 0, startY = 0, endX = canvas.width, endY = canvas.height) => {
    let allPoints = [];
    ctx.fillStyle = '#000000';

    for (let i = 0; i < amount; i++) {
        let x = Math.random() * (endX - startX) + startX;
        let y = Math.random() * (endY - startY) + startY;
        allPoints.push([x, y]);
    }

    return allPoints;
}

const displayPoints = allPoints => allPoints.forEach(p => ctx.fillRect(p[0], p[1], 3, 3));

let allPoints = generateRandomPoints(1000);
displayPoints(allPoints);
const delaunay = Delaunay.from(allPoints);
const voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
voronoi.render(ctx);
ctx.stroke();

const getAllCellPolygons = () => {
    let len = allPoints.length;
    let arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(voronoi.cellPolygon(i));
    }

    return arr;
}

let cellPolygons = getAllCellPolygons();
console.log(cellPolygons);