import { Delaunay } from "./d3-delaunay/index.js";
import { canvas, ctx } from './constants.js';

class Tile {
    constructor(i, mapGen) {
        this.i = i;
        this.centroid = [
            mapGen.allPoints[i][0], // x
            mapGen.allPoints[i][1]  // y
        ];
        this.polygon = mapGen.voronoi.cellPolygon(i);
        this.neighbors = this.getNeighborsArray(i, mapGen);
        this.height = null;
    }

    getNeighborsArray = (i, mapGen) => {
        let n = mapGen.voronoi.neighbors(i);
        let allNeighbors = [];

        for (let neighbor of n) {
            allNeighbors.push(neighbor);
        }

        return allNeighbors;
    }

    setHeight = (height) => this.height = height;
}

class MapGenerator {
    constructor(numOfPoints) {
        this.allPoints = this.generateRandomPoints(numOfPoints);
        this.delaunay;
        this.voronoi;
        this.tiles = [];
        this.allVoronoiPolygonPoints;
        this.initVoronoi(this.allPoints);
        this.initTiles(this.allPoints);
        this.setTilesHeight();
        this.drawAll(this.allPoints);
    }

    getTile = (i) => this.tiles[i];

    setTilesHeight = () => {
        let randTile = this.getTile(500);
        randTile.setHeight(100);
        let queue = [
            randTile
        ];
        let decrement = 0.7;

        while (queue.length) {
            let cur = queue.shift();
            let curHeight = cur.height;
            let neighbors = cur.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let n = this.getTile(neighbors[i]);
                if (n.height === null) {
                    n.height = curHeight * decrement;
                    queue.push(n);
                }
            }
        }
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
        this.voronoi.renderBounds(ctx)
        ctx.stroke();
    }

    drawAll = (points) => {
        this.clearCanvas();

        let len = this.tiles.length;
        for (let i = 0; i < len; i++) {
            let tile = this.getTile(i);
            let h = tile.height;
            let fillColor;

            ctx.beginPath();
            if (h > 80) {
                fillColor = "red";
            } else if (h > 60) {
                fillColor = "orange";
            } else if (h > 40) {
                fillColor = "yellow";
            } else if (h > 20) {
                fillColor = "lightgreen";
            } else {
                fillColor = "lightblue";
            }

            this.voronoi.renderCell(i, ctx);
            ctx.strokeStyle = "black";
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.stroke();
        }
        // this.drawVoronoi();
        // this.drawDelaunay()
        // this.drawPoints(points);
    }

    initVoronoi = (points) => {
        this.createVoronoi(points);
        this.relaxVoronoi(5);
    }

    initTiles = (points) => {
        this.tiles = [];
        for (let i = 0; i < points.length; i++) {
            let tile = new Tile(i, this);
            this.tiles.push(tile);
        }
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

canvas.addEventListener("click", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    let cell = mapGen.delaunay.find(x, y);
    let neighbors = mapGen.voronoi.neighbors(cell);

    ctx.beginPath();
    for (let n of neighbors) mapGen.voronoi.renderCell(n, ctx);
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    mapGen.voronoi.renderCell(cell, ctx);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, 2, 2);

})