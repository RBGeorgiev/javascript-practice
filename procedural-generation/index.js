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

    random = (min = 0, max = 1) => Math.random() * (max - min) + min;

    getRandomTiles = (max, min = 1, rand = true) => {
        let len = (rand) ? Math.round(this.random(min, max)) : max;
        let numOfTiles = this.tiles.length;
        if (len > numOfTiles) len = numOfTiles;
        let randTiles = [];
        let visited = {};

        for (let i = 0; i < len; i++) {
            let idx = Math.round(this.random(0, numOfTiles - 1));

            if (!visited[idx]) {
                visited[idx] = 1
            } else {
                i--;
                continue;
            }

            randTiles.push(this.getTile(idx));
        }

        return randTiles;
    }

    setTilesHeight = () => {
        let randTiles = this.getRandomTiles(15, 5);
        randTiles.forEach(tile => {
            let dir = (Math.random() > 0.4) ? 1 : -1;
            tile.setHeight(dir * 100)
        });
        let queue = [
            ...randTiles
        ];
        let decrement;

        while (queue.length) {
            // if MAX number of this.random > 100 there is a chance for height increase; 
            // the lower the MIN number is, the higher the chance for a sharp drop in height 
            decrement = this.random(50, 100) / 100;

            let cur = queue.shift();
            let curHeight = cur.height;
            let neighbors = cur.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let n = this.getTile(neighbors[i]);
                if (n.height === null) {
                    n.height = Math.round(curHeight * decrement);
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

    drawHeightmap = () => {
        let len = this.tiles.length;
        for (let i = 0; i < len; i++) {
            let tile = this.getTile(i);
            let h = tile.height;
            let fillColor;

            ctx.beginPath();
            if (h > 100) {
                fillColor = "#230303";
            } else if (h > 90) {
                fillColor = "maroon";
            } else if (h > 80) {
                fillColor = "brown";
            } else if (h > 70) {
                fillColor = "crimson";
            } else if (h > 60) {
                fillColor = "darkorange";
            } else if (h > 50) {
                fillColor = "orange";
            } else if (h > 40) {
                fillColor = "yellow";
            } else if (h > 30) {
                fillColor = "#FFFF55";
            } else if (h > 20) {
                fillColor = "#A6FF00";
            } else if (h > 10) {
                fillColor = "#00FF33";
            } else if (h > 0) {
                fillColor = "#33FF69";
            } else if (h > -10) {
                fillColor = "#5883F2";
            } else if (h > -20) {
                fillColor = "#4072F0";
            } else if (h > -30) {
                fillColor = "#2860EE";
            } else if (h > -40) {
                fillColor = "#0F47D5";
            } else if (h > -50) {
                fillColor = "#0D3FBD";
            } else if (h > -60) {
                fillColor = "#0B37A5";
            } else if (h > -70) {
                fillColor = "#0A2F8E";
            } else if (h > -80) {
                fillColor = "#082776";
            } else if (h > -90) {
                fillColor = "#061F5E";
            } else if (h > -100) {
                fillColor = "#050830";
            } else {
                fillColor = "black"
            }

            this.voronoi.renderCell(i, ctx);
            ctx.fillStyle = fillColor;
            ctx.fill();
        }
    }

    drawDelaunay = () => {
        ctx.strokeStyle = "red";
        this.delaunay.render(ctx);
        ctx.stroke();
    }

    drawVoronoi = () => {
        ctx.strokeStyle = "#0000FF";
        this.voronoi.render(ctx);
        this.voronoi.renderBounds(ctx)
        ctx.stroke();
    }

    drawPoints = () => {
        let points = this.allPoints;
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        points.forEach(p => ctx.rect(p[0], p[1], 3, 3));
        ctx.fill();
    }

    drawAll = () => {
        this.clearCanvas();
        this.drawHeightmap();
        this.drawVoronoi();
        // this.drawDelaunay()
        // this.drawPoints();
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