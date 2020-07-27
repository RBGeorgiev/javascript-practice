import { Delaunay } from "./d3-delaunay/index.js";
import { canvas, ctx } from './constants.js';

class Tile {
    constructor(idx, mapGen) {
        this.idx = idx;
        this.centroid = [
            mapGen.allPoints[idx][0], // x
            mapGen.allPoints[idx][1]  // y
        ];
        this.polygon = mapGen.voronoi.cellPolygon(idx);
        this.neighbors = this.getNeighborsArray(idx, mapGen);
        this.height = null;
    }

    getNeighborsArray = (idx, mapGen) => {
        let n = mapGen.voronoi.neighbors(idx);
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
        this.allVoronoiPolygonPoints;
        this.tiles = [];
        this.landTiles = {};
        this.waterTiles = {}
        this.coastline = [];
        this.initVoronoi(this.allPoints);
        this.initTiles(this.allPoints);
        this.setTilesHeight();
        this.determineCoastline();
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
            (curHeight > 0) ? this.landTiles[cur.idx] = cur : this.waterTiles[cur.idx] = cur;
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

    getEdgeBetweenTiles = (A, B) => {
        let edge = [];

        // count starts from 1 because the first and last polygon vertices are the same
        for (let i = 1; i < A.polygon.length; i++) {
            let x1 = A.polygon[i][0];
            let y1 = A.polygon[i][1];
            // count starts from 1 because the first and last polygon vertices are the same
            for (let j = 1; j < B.polygon.length; j++) {
                let x2 = B.polygon[j][0];
                let y2 = B.polygon[j][1];

                if (x1 === x2 && y1 === y2) {
                    edge.push([x1, y1]);
                }
            }
        }

        return edge;
    }

    determineCoastline = () => {
        let coastline = [];

        for (let idx in this.landTiles) {
            let tileCoast = [];
            let landTile = this.landTiles[idx];
            let neighbors = landTile.neighbors;

            for (let k = 0; k < neighbors.length; k++) {
                if (this.waterTiles[neighbors[k]]) {
                    let waterTile = this.getTile(neighbors[k]);
                    let edge = this.getEdgeBetweenTiles(landTile, waterTile);
                    if (edge.length) tileCoast.push(edge);
                }
            }

            if (tileCoast.length) coastline.push(tileCoast);
        }

        this.coastline = coastline;
    }

    drawHeightmap = () => {
        let len = this.tiles.length;
        for (let i = 0; i < len; i++) {
            let tile = this.getTile(i);
            let h = tile.height;
            let color;

            ctx.beginPath();
            if (h > 100) {
                color = "#FFFFFF";
            } else if (h > 90) {
                color = "maroon";
            } else if (h > 80) {
                color = "brown";
            } else if (h > 70) {
                color = "crimson";
            } else if (h > 60) {
                color = "darkorange";
            } else if (h > 50) {
                color = "orange";
            } else if (h > 40) {
                color = "yellow";
            } else if (h > 30) {
                color = "#FFFF55";
            } else if (h > 20) {
                color = "#A6FF00";
            } else if (h > 10) {
                color = "#00FF33";
            } else if (h > 0) {
                color = "#33FF69";
            } else if (h > -10) {
                color = "#5883F2";
            } else if (h > -20) {
                color = "#4072F0";
            } else if (h > -30) {
                color = "#2860EE";
            } else if (h > -40) {
                color = "#0F47D5";
            } else if (h > -50) {
                color = "#0D3FBD";
            } else if (h > -60) {
                color = "#0B37A5";
            } else if (h > -70) {
                color = "#0A2F8E";
            } else if (h > -80) {
                color = "#082776";
            } else if (h > -90) {
                color = "#061F5E";
            } else if (h > -100) {
                color = "#050830";
            } else {
                color = "black"
            }

            this.voronoi.renderCell(i, ctx);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.fill();
            ctx.stroke();
        }
    }

    drawCoastline = () => {
        let coastline = this.coastline;

        for (let i = 0; i < coastline.length; i++) {
            let tileCoast = coastline[i];
            ctx.beginPath();
            for (let j = 0; j < tileCoast.length; j++) {
                let edge = tileCoast[j];
                let x1 = edge[0][0];
                let y1 = edge[0][1];
                let x2 = edge[1][0];
                let y2 = edge[1][1];
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.stroke();
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
        this.voronoi.renderBounds(ctx); //border around canvas
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
        this.drawCoastline();
        // this.drawVoronoi();
        // this.drawDelaunay();
        this.drawPoints();
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
    // let x = e.offsetX;
    // let y = e.offsetY;
    // let cell = mapGen.delaunay.find(x, y);
    // console.log(mapGen.tiles[cell]);
    // let neighbors = mapGen.voronoi.neighbors(cell);

    const calculateWind = () => {
        let wildLineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        let windLines = [];

        let windAngle = Math.round(mapGen.random(0, 360));

        const rotateAroundCenter = (cx, cy, x, y, angle) => {
            let radians = (Math.PI / 180) * angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        // prevailing wind direction
        ctx.beginPath();
        for (let idx in mapGen.waterTiles) {
            let windOffset = Math.round(mapGen.random(-10, 10));
            let tile = mapGen.waterTiles[idx];
            let x1 = tile.centroid[0];
            let y1 = tile.centroid[1];
            let rot = rotateAroundCenter(x1, y1, x1, y1 - wildLineLength, windAngle + windOffset);
            let x2 = rot[0];
            let y2 = rot[1];
            let line = [x1, y1, x2, y2];
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            windLines.push(line);
        }
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;
        ctx.stroke();
        // })

        // canvas.addEventListener("mousemove", (e) => {
        const lineCollision = (x1, y1, x2, y2, x3, y3, x4, y4) => {
            let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
            let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

            // if uA and uB are between 0-1, lines are colliding
            if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
                // find where the lines meet
                let intersectionX = x1 + (uA * (x2 - x1));
                let intersectionY = y1 + (uA * (y2 - y1));

                return { x: intersectionX, y: intersectionY };
            }
            return false;
        }

        const findTilesIntersectingLine = (tileType, line1) => {
            for (let idx in tileType) {
                let tile = tileType[idx];
                let vertices = tile.polygon;
                // first and last vertex are the same
                for (let i = 0; i < vertices.length - 1; i++) {
                    let line2 = [vertices[i][0], vertices[i][1], vertices[i + 1][0], vertices[i + 1][1]];
                    let collision = lineCollision(...line1, ...line2);
                    if (collision) {
                        ctx.beginPath();
                        mapGen.voronoi.renderCell(+idx, ctx);
                        ctx.fillStyle = 'pink';
                        ctx.fill();
                    }
                }
            }

            ctx.beginPath();
            ctx.moveTo(line1[0], line1[1]);
            ctx.lineTo(line1[2], line1[3]);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        mapGen.drawAll();
        for (let i = 0; i < windLines.length; i++) {
            let line1 = windLines[i];
            findTilesIntersectingLine(mapGen.landTiles, line1);
        }
    }

    // ________________________________________________________________________________________________________

    const createPartitions = () => {
        let allPartitions = [];
        let partitionSize = 100;
        for (let x = 0; x < canvas.width; x += partitionSize) {
            for (let y = 0; y < canvas.height; y += partitionSize) {
                let top = [x, y, x + partitionSize, y];
                let bottom = [x, y + partitionSize, x + partitionSize, y + partitionSize];
                let left = [x, y, x, y + partitionSize];
                let right = [x + partitionSize, y, x + partitionSize, y + partitionSize];
                let bounds = [top, bottom, left, right];
                let partition = {
                    bounds,
                    'tiles': []
                }
                allPartitions.push(partition);
            }
        }
        return allPartitions;
    }

    const drawPartitionBounds = (allPartitions) => {
        for (let i = 0; i < allPartitions.length; i++) {
            let bounds = allPartitions[i].bounds;
            for (let j = 0; j < bounds.length; j++) {
                let x1 = bounds[j][0];
                let y1 = bounds[j][1];
                let x2 = bounds[j][2];
                let y2 = bounds[j][3];

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // calculateWind();
    let partitions = createPartitions();
    drawPartitionBounds(partitions);
})