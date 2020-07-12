import { Delaunay } from "./d3-delaunay/index.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class MapGenerator {
    constructor(numOfPoints) {
        this.allPoints = generateRandomPoints(numOfPoints);
        this.delaunay;
        this.voronoi;
        this.allVoronoiPolygonPoints;
        init();
        drawAll();
    }

    lloydRelaxation = (points) => {
        let len = points.length;
        let coords = [];

        for (let i = 0; i < len; i++) {
            let polygonPoints = allVoronoiPolygonPoints[i];
            if (!polygonPoints) continue;
            let centroid = getCentroid(polygonPoints);
            coords.push(centroid);
        }

        return coords;
    }

    clearCanvas = () => {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
    }

    createVoronoi = (points) => {
        delaunay = Delaunay.from(points);
        voronoi = delaunay.voronoi([0, 0, canvas.width, canvas.height]);
        allVoronoiPolygonPoints = getAllVoronoiPolygonPoints();
    }

    drawDelaunay = () => {
        ctx.strokeStyle = "red";
        delaunay.render(ctx);
        ctx.stroke();
    }

    drawVoronoi = () => {
        ctx.strokeStyle = "blue";
        voronoi.render(ctx);
        ctx.stroke();
    }

    drawAll = () => {
        clearCanvas();
        drawVoronoi();
        drawDelaunay()
        drawPoints(allPoints);
    }

    init = () => {
        createVoronoi(allPoints);
        relaxVoronoi(5);
    }

    relaxVoronoi = (times) => {
        for (let i = 0; i < times; i++) {
            allPoints = lloydRelaxation(allPoints);
            createVoronoi(allPoints);
        }
    }
    generateRandomPoints = (amount, startX = 0, startY = 0, endX = canvas.width, endY = canvas.height) => {
        let allPoints = [];
        ctx.fillStyle = '#000000';

        for (let i = 0; i < amount; i++) {
            let x = Math.random() * (endX - startX) + startX;
            let y = Math.random() * (endY - startY) + startY;
            allPoints.push([x, y]);
        }

        return allPoints;
    }

    drawPoints = points => points.forEach(p => ctx.fillRect(p[0], p[1], 3, 3));

    getAllVoronoiPolygonPoints = () => {
        let len = allPoints.length;
        let arr = [];

        for (let i = 0; i < len; i++) {
            arr.push(voronoi.cellPolygon(i));
        }

        return arr;
    }

    getCentroid = (polygonPoints) => {
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
}