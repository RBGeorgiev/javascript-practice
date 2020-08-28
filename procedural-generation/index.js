import { Delaunay } from "./d3-delaunay/index.js";
import { canvas, ctx } from './constants.js';
import drawCurve from './drawCurve.js';


const randomUint32 = () => (Math.random() * 4294967296) >>> 0; // random seed generator

// Simple Fast Counter 32 bit - seeded pseudo random number generator
const sfc32 = (a, b, c, d) => {
    return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = c << 21 | c >>> 11;
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}


// add drawCurve to 2D context
if (CanvasRenderingContext2D !== 'undefined') {
    CanvasRenderingContext2D.prototype.drawCurve =
        function (pts, tension, isClosed, numOfSegments, showPoints) {
            drawCurve(this, pts, tension, isClosed, numOfSegments, showPoints)
        }
}

class RiverNode {
    constructor(idx, tile) {
        this.parent = null;
        this.children = [];
        this.idx = idx;
        this.tile = tile;
        this.dry = false;
    }

    addChild = (child) => this.children.push(child);

    setParent = (parent) => this.parent = parent;

    getRoot = () => (this.parent == null) ? this : this.parent.getRoot();
}

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
        this.precipitation = 0;
        this.river = null;
        this.temperature = 0;
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

    setTemperature = (degrees) => this.temperature = degrees;
}

class MapGenerator {
    constructor(numOfPoints, seed = null) {
        this.seed = seed || randomUint32();
        this.rng = sfc32(this.seed, this.seed, this.seed, this.seed); // using this.rng() generates number between 0 and 1
        console.log(this.seed)

        this.allPoints = this.generateRandomPoints(numOfPoints);
        this.delaunay;
        this.voronoi;
        this.allVoronoiPolygonPoints;
        this.tiles = [];
        this.landTiles = {};
        this.oceanTiles = {}
        this.coastline = [];
        this.initVoronoi(this.allPoints);
        this.initTiles(this.allPoints);
        this.setTilesHeight();
        this.determineCoastline();
        this.drawAll(this.allPoints);
    }

    getTile = (i) => this.tiles[i];

    randRange = (min = 0, max = 1) => this.rng() * (max - min) + min;

    getRandomTiles = (min = 5, max = 15) => {
        let len = Math.round(this.randRange(min, max));
        let numOfTiles = this.tiles.length;
        if (len > numOfTiles) len = numOfTiles;
        let randTiles = [];
        let visited = {};

        for (let i = 0; i < len; i++) {
            let idx = Math.round(this.randRange(0, numOfTiles - 1));

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
        let randTiles = this.getRandomTiles(numberOfRandomInitialPeaksOrTrenchesMin, numberOfRandomInitialPeaksOrTrenchesMax);
        randTiles.forEach(tile => {
            let dir = (this.rng() >= chanceForLand) ? 1 : -1;
            tile.setHeight(dir * 100)
        });
        let queue = [
            ...randTiles
        ];
        let decrement;

        while (queue.length) {
            decrement = this.randRange(heightDecrementMin, heightDecrementMax) / 100;

            let cur = queue.shift();
            let curHeight = cur.height;
            (curHeight >= 0) ? this.landTiles[cur.idx] = cur : this.oceanTiles[cur.idx] = cur;
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
                if (this.oceanTiles[neighbors[k]]) {
                    let oceanTile = this.getTile(neighbors[k]);
                    let edge = this.getEdgeBetweenTiles(landTile, oceanTile);
                    if (edge.length) tileCoast.push(edge);
                }
            }

            if (tileCoast.length) coastline.push(tileCoast);
        }

        this.coastline = coastline;
    }

    fillTile = (idx, color = '#FFC0CB') => {
        ctx.beginPath();
        this.voronoi.renderCell(idx, ctx);
        ctx.fillStyle = color;
        ctx.fill();
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
                color = "#ce0000";
            } else if (h > 80) {
                color = "#e22f14";
            } else if (h > 70) {
                color = "#e56414";
            } else if (h > 60) {
                color = "#e59814";
            } else if (h > 50) {
                color = "#eac820";
            } else if (h > 40) {
                color = "#e7f702";
            } else if (h > 30) {
                color = "#ccea20";
            } else if (h > 20) {
                color = "#9ee52b";
            } else if (h > 10) {
                color = "#22c94e";
            } else if (h >= 0) {
                color = "#2ce861";
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

            this.fillTile(i, color);
            ctx.strokeStyle = color;
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
        ctx.strokeStyle = "#000000";
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
            let x = this.rng() * (endX - startX) + startX;
            let y = this.rng() * (endY - startY) + startY;
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

let seed = 2546076188;
let numOfPoints = 1000; // important value
let numberOfRandomInitialPeaksOrTrenchesMin = 5; // important value
let numberOfRandomInitialPeaksOrTrenchesMax = 15; // important value
let chanceForLand = 0.5; // important value

// the lower the MIN number is, the higher the chance for a sharp drop in height 
let heightDecrementMin = 50; // important value
// if MAX number higher than 100 there is a chance for height increase
let heightDecrementMax = 100; // important value

let defaultTilePrecipitation = 100; // important value
let maxDefaultPrecipitationTiles = 20; // important value
let heightPrecipitationMultiplier = 2; // important value

let precipitationForRiverMin = 200; // important value
let precipitationForRiverMax = 1000; // important value

let precipitationForLakeMin = 1000; // important value
let precipitationForLakeMax = 5000; // important value
let lakeHeightPrecipitationMultiplier = 70; // important value

let riverWidthMax = 10; // important value
let riverWidthMin = 3; // important value
let riverWidthDistanceStrengthControl = 20; // important value

let precipitationFromClimate = -3000; // important value

let seaLevelTemperature = 18; // important value

let mapGen = new MapGenerator(numOfPoints, seed);

canvas.addEventListener("click", (e) => {
    // let x = e.offsetX;
    // let y = e.offsetY;
    // let cell = mapGen.delaunay.find(x, y);
    // console.log(mapGen.tiles[cell]);
    // let neighbors = mapGen.voronoi.neighbors(cell);

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
        let tiles = new Set;
        for (let idx in tileType) {
            let tile = tileType[idx];
            let vertices = tile.polygon;
            // first and last vertex are the same
            for (let i = 1; i < vertices.length; i++) {
                let line2 = [vertices[i - 1][0], vertices[i - 1][1], vertices[i][0], vertices[i][1]];
                let collision = lineCollision(...line1, ...line2);
                if (collision) {
                    tiles.add(+idx);
                }
            }
        }
        return [...tiles];
    }

    const createWindLines = () => {
        let windLines = [];
        let windAngle = Math.round(mapGen.randRange(0, 360));

        const rotateAroundCenter = (cx, cy, x, y, angle) => {
            let radians = (Math.PI / 180) * angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        // prevailing wind direction
        for (let idx in mapGen.oceanTiles) {
            let windOffset = Math.round(mapGen.randRange(-5, 5));
            let tile = mapGen.oceanTiles[idx];
            let x1 = tile.centroid[0];
            let y1 = tile.centroid[1];
            let rot = rotateAroundCenter(x1, y1, x1, y1 - windLineLength, windAngle + windOffset);
            let x2 = rot[0];
            let y2 = rot[1];
            let line = [x1, y1, x2, y2];

            windLines.push({
                line,
                "intersectedPartitions": [],
                "intersectedTiles": []
            });
        }

        return windLines;
    }

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
                    'tiles': {
                        'landTiles': {},
                        'oceanTiles': {}
                    }
                }
                allPartitions.push(partition);
            }
        }
        return allPartitions;
    }

    const addTilesToPartitions = () => {
        const isPointInPartition = (point, partition) => {
            let x = point[0];
            let y = point[1];
            let topLine = partition.bounds[0];
            let leftLine = partition.bounds[2];
            return x > topLine[0] && x < topLine[2] && y > leftLine[1] && y < leftLine[3];
        }

        for (let i = 0; i < mapGen.allPoints.length; i++) {
            let point = mapGen.allPoints[i];
            for (let j = 0; j < partitions.length; j++) {
                let inPartition = isPointInPartition(point, partitions[j])
                if (inPartition) {
                    let type = (mapGen.landTiles[i]) ? 'landTiles' : 'oceanTiles';
                    partitions[j].tiles[type][i] = (mapGen.getTile(i));
                }
            }
        }
    }

    const findPartitionsIntersectingLine = (partitions, line1) => {
        let intersectedPartitions = [];
        for (let i = 0; i < partitions.length; i++) {
            let cur = partitions[i];
            let bounds = cur.bounds;
            for (let j = 0; j < bounds.length; j++) {
                let line2 = bounds[j];
                let collision = lineCollision(...line1, ...line2);
                if (collision) {
                    intersectedPartitions.push(cur);
                    break;
                }
            }
        }
        return intersectedPartitions;
    }

    const connectPartitionsToLines = (partitions, windLines) => {
        for (let i = 0; i < windLines.length; i++) {
            let line = windLines[i];
            let intersectedPartitions = findPartitionsIntersectingLine(partitions, line.line);
            line.intersectedPartitions = intersectedPartitions;
        }
    }

    const findTilesIntersectingLineThroughPartitions = (windLines) => {
        for (let i = 0; i < windLines.length; i++) {
            let line = windLines[i];
            for (let j = 0; j < line.intersectedPartitions.length; j++) {
                let tiles = findTilesIntersectingLine(line.intersectedPartitions[j].tiles.landTiles, line.line);
                line.intersectedTiles.push(...tiles);
            }
        }
    }

    const drawWindLines = (windLines) => {
        for (let wind of windLines) {
            let line = wind.line;
            ctx.beginPath();
            ctx.moveTo(line[0], line[1]);
            ctx.lineTo(line[2], line[3]);
            ctx.strokeStyle = '#FFFFFF99';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
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

    const drawWindIntersectedTiles = (windLines) => {
        for (let line of windLines) {
            let tiles = line.intersectedTiles;
            for (let idx of tiles) {
                mapGen.fillTile(idx);
            }
        }
    }

    const resetPrecipitation = () => mapGen.tiles.forEach(t => t.precipitation = 0);

    const getDistanceBetweenPoints = (p1, p2) => {
        let x1 = p1[0];
        let y1 = p1[1];
        let x2 = p2[0];
        let y2 = p2[1];

        let a = x1 - x2;
        let b = y1 - y2;

        return Math.sqrt(a * a + b * b);
    }

    const calculatePrecipitation = (windLines) => {
        for (let line of windLines) {
            let tiles = line.intersectedTiles;
            let totalWaterAvailable = defaultTilePrecipitation * maxDefaultPrecipitationTiles;
            let tileDistances = [];
            // get tile distance
            for (let idx of tiles) {
                let tile = mapGen.getTile(idx);
                let dist = getDistanceBetweenPoints(line.line, tile.centroid);
                tileDistances.push([idx, dist]);
            }

            // sort tiles by ascending distance
            tileDistances = tileDistances.sort((a, b) => a[1] - b[1]);

            // get tile precipitation
            for (let cur of tileDistances) {
                if (totalWaterAvailable <= 0) break;
                let tile = mapGen.getTile(cur[0]);
                let dist = cur[1];
                let linePercentVal = windLineLength / 100;
                let percentDistFromLineStart = dist / linePercentVal / 100;
                let distPrecipitation = defaultTilePrecipitation - (defaultTilePrecipitation * percentDistFromLineStart);
                let heightPrecipitation = tile.height * heightPrecipitationMultiplier;

                let precipitation = distPrecipitation + heightPrecipitation;
                if (totalWaterAvailable - precipitation < 0) precipitation = totalWaterAvailable;
                totalWaterAvailable -= precipitation;

                tile.precipitation += Math.round(precipitation);
            }
        }
    }

    const displayPrecipitationValue = (tiles) => {
        for (let idx in tiles) {
            let tile = mapGen.getTile(idx);
            let x = tile.centroid[0];
            let y = tile.centroid[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(tile.precipitation, x, y);
        }
    }

    // ____________________________________________________________________________________________________________
    // rivers and lakes

    const getTilesByHeight = (tiles) => {
        let tilesByHeight = [];
        for (let idx in tiles) {
            let tile = mapGen.getTile(idx);
            tilesByHeight.push(tile);
        }
        return tilesByHeight.sort((a, b) => b.height - a.height);
    }

    const resetRivers = () => {
        for (let tile of mapGen.tiles) {
            tile.river = null;
        }
    }

    const defineRivers = () => {
        let tilesByHeight = getTilesByHeight(mapGen.landTiles);
        let riverNodes = [];

        for (let i = 0; i < tilesByHeight.length; i++) {
            let tile = tilesByHeight[i];
            let neighbors = tile.neighbors;
            let lowestNeighbor;

            for (let idx of neighbors) {
                let n = mapGen.getTile(idx);
                if (!lowestNeighbor || n.height < lowestNeighbor.height) lowestNeighbor = n;
            }

            if (tile.precipitation > precipitationForRiverMin) {
                let precipitationForRiverUpperBound = (tile.precipitation > precipitationForRiverMax) ? precipitationForRiverMax : tile.precipitation;
                let precipitationForRiverLeftInTile = Math.round(mapGen.randRange(precipitationForRiverMin, precipitationForRiverUpperBound));
                let flowAmount = tile.precipitation - precipitationForRiverLeftInTile;

                lowestNeighbor.precipitation += flowAmount;
                tile.precipitation -= flowAmount;

                if (!tile.river) {
                    let riverIdx = riverNodes.length;
                    tile.river = new RiverNode(riverIdx, tile);
                    riverNodes.push(tile.river);
                }
                if (!lowestNeighbor.river) {
                    let riverIdx = riverNodes.length;
                    lowestNeighbor.river = new RiverNode(riverIdx, lowestNeighbor);
                    riverNodes.push(lowestNeighbor.river);
                }

                let top = tile.river;
                let bot = lowestNeighbor.river;

                if (bot.parent && bot.parent.idx === top.idx) {
                    bot.parent = null;
                }
                if (bot.getRoot().idx === top.getRoot().idx) {
                    continue;
                }
                top.setParent(bot);
                bot.addChild(top);
            }
        }

        let riversSet = new Set();
        riverNodes.forEach(river => riversSet.add(river.getRoot()));
        return [...riversSet];
    }

    const defineLakes = (rivers) => {
        let possibleLakes = [];
        // find possible lakes from lowest river tile on land
        rivers.forEach(river => (!mapGen.oceanTiles[river.tile.idx] && river.tile.precipitation > precipitationForRiverMin) ? possibleLakes.push(river.tile) : false);

        // define lakes
        for (let i = 0; i < possibleLakes.length; i++) {
            let mbLake = possibleLakes[i];
            if (mbLake.precipitation >= precipitationForLakeMin) {
                lakeTiles[mbLake.idx] = mbLake;
                delete mapGen.landTiles[mbLake.idx];
                possibleLakes.splice(i, 1);
                i--;
            }
        }
    }

    // expand lakes
    const expandLakes = () => {
        let queue = [];
        for (let idx in lakeTiles) {
            let lake = lakeTiles[idx];
            queue.push(lake);
        }

        while (queue.length > 0) {
            let lake = queue.shift();
            let neighbors = lake.neighbors;

            let neighborsByHeight = [];
            for (let n of neighbors) {
                neighborsByHeight.push(mapGen.getTile(n));
            }
            neighborsByHeight.sort((a, b) => a.height - b.height);
            let waterSpreadAverage = Math.round(lake.precipitation / neighbors.length);
            let totalWaterAvailable = lake.precipitation - precipitationForLakeMax;

            for (let neighbor of neighborsByHeight) {
                if (totalWaterAvailable <= 0) break;
                if (mapGen.oceanTiles[neighbor.idx]) break;
                if (lakeTiles[neighbor.idx]) continue;

                let heightDifference = neighbor.height - lake.height;

                let waterMoved = waterSpreadAverage + ((100 - heightDifference) * lakeHeightPrecipitationMultiplier) - heightDifference * lakeHeightPrecipitationMultiplier;
                if (waterMoved > totalWaterAvailable) waterMoved = totalWaterAvailable;

                neighbor.precipitation += waterMoved;
                lake.precipitation -= waterMoved;
                totalWaterAvailable -= waterMoved;

                if (neighbor.precipitation >= precipitationForLakeMin) {
                    lakeTiles[neighbor.idx] = neighbor;
                    delete mapGen.landTiles[neighbor.idx];

                    queue.push(neighbor);
                }
            }
        }
    }

    // _________________________________________



    const voronoiFindPathsBetweenTwoVertices = (tile, start, end) => {
        // removes repeated polygon point
        let polygonPoints = tile.polygon.slice(0, -1);
        let path1 = [];
        let path2 = [];
        let foundFirstPath = false;
        let startIdx;

        // get start idx
        for (let i = 0; i < polygonPoints.length; i++) {
            let x1 = polygonPoints[i][0];
            let y1 = polygonPoints[i][1];

            if (start[0] === x1 && start[1] === y1) {
                startIdx = i;
                break;
            }
        }

        // find both paths
        for (let i = startIdx; i < polygonPoints.length + startIdx; i++) {
            let idx = i % polygonPoints.length;

            (foundFirstPath) ? path2.unshift(polygonPoints[idx]) : path1.push(polygonPoints[idx]);

            if (
                polygonPoints[idx][0] === end[0] &&
                polygonPoints[idx][1] === end[1]
            ) {
                foundFirstPath = true;
            }
        }

        // add missing points for path2
        path2.unshift(start);
        path2.push(end);

        return (path1.length <= path2.length) ? [path1, path2] : [path2, path1]; // 0 is short path, 1 is long path
    }

    const drawRiversOnVoronoiEdges = (rivers, curveStrength = 0.4) => {
        let queue = [...rivers];
        let visitedSet = {};

        let allRiverPaths = [];
        // get paths for all rivers
        while (queue.length > 0) {
            let cur = queue.shift();
            let children = cur.children;
            if (children.length === 0) continue;
            let start = (visitedSet[cur.tile.idx]) ? visitedSet[cur.tile.idx] : cur.tile.polygon[Math.round(mapGen.randRange(0, cur.tile.polygon.length - 1))];
            let riverPath = [];
            for (let child of children) {
                if (visitedSet[child.tile.idx]) continue;
                let edge = mapGen.getEdgeBetweenTiles(cur.tile, child.tile);
                let randConnectingPoint = (mapGen.rng() < 0.5) ? edge[0] : edge[1];

                // don't draw river inside the ocean
                if (!mapGen.oceanTiles.hasOwnProperty(cur.tile.idx)) {
                    let riverSubPath = voronoiFindPathsBetweenTwoVertices(cur.tile, start, randConnectingPoint);
                    riverPath.push(riverSubPath[0]); // 0 is short path, 1 is long path
                }

                visitedSet[child.tile.idx] = randConnectingPoint;
                queue.push(child);
            }

            allRiverPaths.push([cur, riverPath]);
        }

        // /draw rivers paths with a curve and varying widths
        let drawnSubPaths = new Set();
        for (let riverNodeAndPath of allRiverPaths) {
            let riverNode = riverNodeAndPath[0];
            let riverPath = riverNodeAndPath[1];
            for (let riverSubPath of riverPath) {
                let points = riverSubPath.flat();
                let str = `x${points[0]}y${points[1]}x1${points[points.length - 2]}y1${points[points.length - 1]}`;

                if (!drawnSubPaths.has(str)) {
                    // get width based on distance from end/root tile
                    let riverRoot = riverNode.getRoot();
                    let distToRoot = getDistanceBetweenPoints(riverRoot.tile.centroid, riverNode.tile.centroid);

                    let distWidth = riverWidthMax - Math.round(distToRoot / riverWidthDistanceStrengthControl);
                    if (distWidth < riverWidthMin) distWidth = riverWidthMin;

                    // get width based on precipitation left in tile
                    let thirdOfPrecipitationRange = Math.round((precipitationForRiverMax - precipitationForRiverMin) / 3);
                    let precipitationWidth;

                    if (riverNode.tile.precipitation <= precipitationForRiverMin + thirdOfPrecipitationRange) {
                        precipitationWidth = 1;
                    } else if (riverNode.tile.precipitation <= precipitationForRiverMin + thirdOfPrecipitationRange * 2) {
                        precipitationWidth = 2;
                    } else if (riverNode.tile.precipitation <= precipitationForRiverMin + thirdOfPrecipitationRange * 3) {
                        precipitationWidth = 3;
                    } else {
                        precipitationWidth = 4;
                    }

                    ctx.drawCurve(points, curveStrength);
                    ctx.lineWidth = (distWidth + precipitationWidth) / 2;
                    ctx.lineCap = "round";
                    ctx.strokeStyle = (riverNode.dry) ? "#bc9678" : "#0e97f2";
                    ctx.stroke();
                }

                drawnSubPaths.add(str);
            }
        }
    }

    const drawLakes = () => {
        for (let idx in lakeTiles) {
            let color = (mapGen.getTile(+idx).dryLake) ? "#bc9678" : "#0e97f2";
            mapGen.fillTile(+idx, color);
        }
    }

    const addPrecipitationFromClimate = () => {
        for (let idx in mapGen.landTiles) {
            let tile = mapGen.getTile(+idx);
            tile.precipitation += precipitationFromClimate;
        }

        for (let idx in lakeTiles) {
            let tile = mapGen.getTile(+idx);
            tile.precipitation += precipitationFromClimate;
        }
    }

    const checkForDryRivers = (rivers) => {
        let visited = new Set();
        let queue = [...rivers];

        while (queue.length) {
            let river = queue.shift();
            let tile = river.tile;

            if (visited.has(tile.idx)) continue;
            visited.add(tile.idx);

            if (river.children) {
                river.children.forEach(c => queue.push(c));
            }

            if (tile.precipitation < precipitationForRiverMin) {
                river.dry = true;
            }
        }
    }

    const checkForDryLakes = () => {
        for (let idx in lakeTiles) {
            let tile = mapGen.getTile(+idx);
            tile.dryLake = !!(tile.precipitation < precipitationForLakeMin);
        }
    }

    const calcualteTemperature = () => {
        // each unit of tile height = 10 meters (i.e. 100 tile height = 1km)
        let tempDecreasePerKm = 10;
        for (let tile of mapGen.tiles) {
            let temperature = seaLevelTemperature - (tile.height / tempDecreasePerKm);
            tile.setTemperature(temperature);
        }
    }


    console.time("calculate wind precipitation rivers and lakes");
    resetPrecipitation();
    resetRivers();
    let windLineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    let partitions = createPartitions();
    let windLines = createWindLines();
    let lakeTiles = {};
    let rivers;

    addTilesToPartitions(partitions);
    connectPartitionsToLines(partitions, windLines);
    findTilesIntersectingLineThroughPartitions(windLines);
    calculatePrecipitation(windLines);

    rivers = defineRivers();
    defineLakes(rivers);
    expandLakes();

    addPrecipitationFromClimate();

    checkForDryRivers(rivers);
    checkForDryLakes();

    calcualteTemperature();


    mapGen.drawAll();

    drawRiversOnVoronoiEdges(rivers, 0.4);
    drawLakes();

    // drawWindIntersectedTiles(windLines);
    // drawWindLines(windLines);
    // drawPartitionBounds(partitions);
    // displayPrecipitationValue(mapGen.tiles);
    console.timeEnd("calculate wind precipitation rivers and lakes");
})