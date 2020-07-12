import { Delaunay } from "./d3-delaunay/index.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class MapGenerator {
    constructor(numOfPoints) {
        this.allPoints = this.generateRandomPoints(numOfPoints);
        this.delaunay;
        this.voronoi;
        this.allVoronoiPolygonPoints;
        this.init(this.allPoints);
        this.drawAll(this.allPoints);
    }

    lloydRelaxation = (points) => {
        let len = points.length;
        let coords = [];

        for (let i = 0; i < len; i++) {
            let polygonPoints = this.allVoronoiPolygonPoints[i];
            if (!polygonPoints) continue;
            let centroid = this.getCentroid(polygonPoints);
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
        this.delaunay = Delaunay.from(points);
        this.voronoi = this.delaunay.voronoi([0, 0, canvas.width, canvas.height]);
        this.allVoronoiPolygonPoints = this.getAllVoronoiPolygonPoints(points);
    }

    drawDelaunay = () => {
        ctx.strokeStyle = "red";
        this.delaunay.render(ctx);
        ctx.stroke();
    }

    drawVoronoi = () => {
        ctx.strokeStyle = "blue";
        this.voronoi.render(ctx);
        ctx.stroke();
    }

    drawAll = (points) => {
        this.clearCanvas();
        this.drawVoronoi();
        this.drawDelaunay()
        this.drawPoints(points);
    }

    init = (points) => {
        this.createVoronoi(points);
        this.relaxVoronoi(5);
    }

    relaxVoronoi = (times) => {
        for (let i = 0; i < times; i++) {
            this.allPoints = this.lloydRelaxation(this.allPoints);
            this.createVoronoi(this.allPoints);
        }
    }
    generateRandomPoints = (amount, startX = 0, startY = 0, endX = canvas.width, endY = canvas.height) => {
        let points = [];
        ctx.fillStyle = '#000000';

        for (let i = 0; i < amount; i++) {
            let x = Math.random() * (endX - startX) + startX;
            let y = Math.random() * (endY - startY) + startY;
            points.push([x, y]);
        }

        return points;
    }

    drawPoints = points => points.forEach(p => ctx.fillRect(p[0], p[1], 3, 3));

    getAllVoronoiPolygonPoints = (points) => {
        let len = points.length;
        let arr = [];

        for (let i = 0; i < len; i++) {
            arr.push(this.voronoi.cellPolygon(i));
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

let mapGen = new MapGenerator(1000);