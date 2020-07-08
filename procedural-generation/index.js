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
// displayPoints(allPoints);
let delaunay = Delaunay.from(allPoints);
let voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
voronoi.render(ctx);
ctx.stroke();

const getAllVoronoiPolygonPoints = () => {
    let len = allPoints.length;
    let arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(voronoi.cellPolygon(i));
    }

    return arr;
}

let allVoronoiPolygonPoints = getAllVoronoiPolygonPoints();

const getCentroid = (polygonPoints) => {
    let totalX = 0;
    let totalY = 0;
    let len = polygonPoints.length;

    for (let i = 0; i < len; i++) {
        let x = polygonPoints[i][0];
        let y = polygonPoints[i][1];

        totalX += x;
        totalY += y;
    }

    return [totalX / len, totalY / len];
}

const lloydRelaxation = () => {
    let len = allPoints.length;
    let coords = [];

    for (let i = 0; i < len; i++) {
        let polygonPoints = allVoronoiPolygonPoints[i];
        if (!polygonPoints) continue;
        let centroid = getCentroid(polygonPoints);
        coords.push(centroid);
    }

    allPoints = coords;
}

const clearCanvas = () => {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

document.addEventListener("click", () => {
    clearCanvas();
    lloydRelaxation();

    delaunay = Delaunay.from(allPoints);
    voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);

    voronoi.render(ctx);
    ctx.stroke();
    allVoronoiPolygonPoints = getAllVoronoiPolygonPoints();
})
