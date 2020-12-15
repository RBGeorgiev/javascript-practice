import { Delaunay } from "./d3-delaunay/index.js";
import {
    canvas,
    ctx,
    temperatureLabel,
    temperatureSpan,
    temperatureInput,
    relativeHumidityLabel,
    relativeHumiditySpan,
    relativeHumidityInput,
    dewpointLabel,
    dewpointSpan,
    dewpointInput,
    windSpeedLabel,
    windSpeedSpan,
    windSpeedInput
} from './constants.js';
import drawCurve from './drawCurve.js';
import { getLerpedColor } from './lerpColor.js';
import { lineCollision } from './lineCollision.js';
import { getDistanceBetweenPoints } from './distanceBetween.js';


const randomUint32 = () => (Math.random() * 4294967296) >>> 0; // random seed generator

// Simple Fast Counter 32 bit - seeded pseudo random number generator
const sfc32 = (a, b, c, d) => {
    return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (a + b | 0) + d | 0;
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
        this.frozen = false;
        this.distToRoot = 0;
        this.farthestLeafDist = 0; // only for root river nodes
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
        this.totalPrecipitationPassedThroughTile = 0;
        this.river = null;
        this.numOfRiversOnEdges = 0;
        this.temperature = 0;
        this.biome = null;
    }

    getNeighborsArray = (idx, mapGen) => {
        let n = mapGen.voronoi.neighbors(idx);
        let allNeighbors = [];

        for (let neighbor of n) {
            allNeighbors.push(neighbor);
        }

        return allNeighbors;
    }

    resetPrecipitation = () => {
        this.precipitation = 0;
        this.totalPrecipitationPassedThroughTile = 0;
    }

    resetRiver = () => {
        this.river = null;
        this.numOfRiversOnEdges = 0;
    }

    resetHeight = () => this.height = null;

    setHeight = (height) => this.height = height;

    setTemperature = (degrees) => this.temperature = degrees;
}

const BIOMES = [
    ["POLAR_DESERT", "POLAR_DESERT", "POLAR_DESERT", "POLAR_DESERT", "GLACIER", "GLACIER", "GLACIER", "GLACIER"],
    ["ROCKY_DESERT", "ROCKY_DESERT", "ROCKY_DESERT", "DRY_TUNDRA", "TUNDRA", "MOIST_TUNDRA", "WET_TUNDRA", "RAIN_TUNDRA"],
    ["SUBPOLAR_DESERT", "DRY_SCRUB", "SUBPOLAR_SCRUB", "VERY_DRY_FOREST", "BOREAL_DRY_FOREST", "BOREAL_FOREST", "BOREAL_WET_FOREST", "BOREAL_WET_FOREST"],
    ["COLD_DESERT", "COOL_TEMPERATE_DESERT_SCRUB", "STEPPE", "DRY_FOREST", "CONIFEROUS_DRY_FOREST", "TEMPERATE_CONIFEROUS_FOREST", "CONIFEROUS_WET_FOREST", "CONIFEROUS_RAIN_FOREST"],
    ["TEMPERATE_DESERT", "XERIC_SHRUBLAND", "DRY_WOODLAND", "WOODLAND", "TEMPERATE_DRY_FOREST", "TEMPERATE_FOREST", "TEMPERATE_WET_FOREST", "TEMPERATE_RAIN_FOREST"],
    ["WARM_TEMPERATE_DESERT", "DESERT_SCRUB", "TEMPERATE_DRY_GRASSLAND", "TEMPERATE_GRASSLAND", "DECIDUOUS_DRY_FOREST", "TEMPERATE_DECIDUOUS_FOREST", "WET_FOREST", "RAIN_FOREST"],
    ["SUBTROPICAL_DESERT", "DESERT_SCRUB", "THORN_WOODLAND", "DRY_SAVANNA", "SUBROPICAL_DRY_FOREST", "SUBTROPICAL_FOREST", "SUBTROPICAL_WET_FOREST", "SUBTROPICAL_RAIN_FOREST"],
    ["TROPICAL_DESERT", "SEMI_ARID_DESERT", "THORN_STEPPE", "DRY_SAVANNA", "WET_SAVANNA", "DRY_TROPICAL_WOODLAND", "TROPICAL_WET_FOREST", "TROPICAL_RAINFOREST"],
    ["HOT_DESERT", "HOT_DESERT", "HOT_DESERT", "HOT_DESERT", "HOT_DESERT", "HOT_DESERT", "HOT_DESERT", "HOT_DESERT"]
]

const BIOMES_COLORS = {
    "POLAR_DESERT": "#F2F2F2",
    "ROCKY_DESERT": "#BFBFBF",
    "DRY_TUNDRA": "#D5D59D",
    "TUNDRA": "#C3BA84",
    "MOIST_TUNDRA": "#B1A06A",
    "WET_TUNDRA": "#A8935E",
    "RAIN_TUNDRA": "#9E8551",
    "SUBPOLAR_DESERT": "#B5AD8B",
    "DRY_SCRUB": "#B1B280",
    "SUBPOLAR_SCRUB": "#ABB377",
    "VERY_DRY_FOREST": "#A4B36E",
    "BOREAL_DRY_FOREST": "#839F53",
    "BOREAL_FOREST": "#618A38",
    "BOREAL_WET_FOREST": "#567C2C",
    "COLD_DESERT": "#C1BA91",
    "COOL_TEMPERATE_DESERT_SCRUB": "#BDC080",
    "STEPPE": "#CBC283",
    "DRY_FOREST": "#A4BA6D",
    "CONIFEROUS_DRY_FOREST": "#70AF54",
    "TEMPERATE_CONIFEROUS_FOREST": "#61AB4B",
    "CONIFEROUS_WET_FOREST": "#52A444",
    "CONIFEROUS_RAIN_FOREST": "#47A536",
    "TEMPERATE_DESERT": "#CCC797",
    "XERIC_SHRUBLAND": "#CACF7F",
    "DRY_WOODLAND": "#B7CF7E",
    "WOODLAND": "#8EB468",
    "TEMPERATE_DRY_FOREST": "#62B65B",
    "TEMPERATE_FOREST": "#4CB754",
    "TEMPERATE_WET_FOREST": "#45B348",
    "TEMPERATE_RAIN_FOREST": "#37B239",
    "WARM_TEMPERATE_DESERT": "#D8D49D",
    "DESERT_SCRUB": "#D6DD7F",
    "TEMPERATE_DRY_GRASSLAND": "#BDDE82",
    "TEMPERATE_GRASSLAND": "#A1D77A",
    "DECIDUOUS_DRY_FOREST": "#65CA68",
    "TEMPERATE_DECIDUOUS_FOREST": "#29BC56",
    "WET_FOREST": "#28BA3C",
    "RAIN_FOREST": "#1FBA1F",
    "SUBTROPICAL_DESERT": "#E4E0A2",
    "THORN_WOODLAND": "#D9E683",
    "DRY_SAVANNA": "#D3E373",
    "SUBROPICAL_DRY_FOREST": "#8ACA43",
    "SUBTROPICAL_FOREST": "#5EBA28",
    "SUBTROPICAL_WET_FOREST": "#59BF2D",
    "SUBTROPICAL_RAIN_FOREST": "#52C62B",
    "TROPICAL_DESERT": "#EFEDA8",
    "SEMI_ARID_DESERT": "#E9EC97",
    "THORN_STEPPE": "#ECF18F",
    "WET_SAVANNA": "#BAD249",
    "DRY_TROPICAL_WOODLAND": "#A3CC35",
    "TROPICAL_WET_FOREST": "#86CC2D",
    "TROPICAL_RAINFOREST": "#6DCC1A",
    "HOT_DESERT": "#FBFAAE",
    "OASIS": "#ADDA6B",
    "RIVER": "#0E97F2",
    "DRY_RIVER": "#C4A67D",
    "FROZEN_RIVER": "#91d0f7",
    "LAKE": "#0E97F2",
    "DRY_LAKE": "#C4A67D",
    "FROZEN_LAKE": "#91d0f7",
    "OCEAN": "#5E86D1",
    "DEEP_OCEAN": "#2b2e49",
    "SWAMP": "#828C51",
    "TEMPERATE_FRESHWATER_SWAMP_FOREST": "#527239",
    "TROPICAL_FRESHWATER_SWAMP_FOREST": "#578e2d",
    "BOG": "#7D7738",
    "FEN": "#636334",
    "ELFIN_WOODLAND": "#6BBD2A",
    "MARSH": "#9FCB4C"
}

class MapGenerator {
    constructor(numOfPoints, seed = null) {
        this.numOfPoints = numOfPoints; // important value
        this.seed = seed || randomUint32();
        this.rng = sfc32(this.seed, this.seed, this.seed, this.seed); // using this.rng() generates number between 0 and 1
        console.log(this.seed);

        this.allPoints = this.generateRandomPoints(this.numOfPoints);
        this.delaunay;
        this.voronoi;
        this.allVoronoiPolygonPoints;
        this.tiles = [];
        this.landTiles = {};
        this.oceanTiles = {};
        this.lakeTiles = {};
        this.coastline = [];


        this.numberOfRandomInitialPeaksOrTrenchesMin = 5; // important value
        this.numberOfRandomInitialPeaksOrTrenchesMax = 15; // important value
        this.chanceForLand = 0.5; // important value

        // the lower the MIN number is, the higher the chance for a sharp drop in height 
        this.heightDecrementMin = 50; // important value
        // if MAX number higher than 100 there is a chance for height increase
        this.heightDecrementMax = 100; // important value

        this.minAllowedTemp = -40;
        this.maxAllowedTemp = 55;

        this.seaLevelTemperature = 14; // important value
        this.relativeHumidity = 80 // percent // important value
        this.dewpoint = this.calcDewpoint(this.seaLevelTemperature, this.relativeHumidity); //dewpoint can't be higher than temperature // important value

        this.oceanTileWaterVapor = this.tempAndRelativeHumidityToMoisture(this.seaLevelTemperature, this.relativeHumidity); // g/kg // important value
        this.windSpeed = 20; // km/h // Beaufort wind force scale // important value
        this.heightPrecipitationMultiplier = .2; // important value

        this.precipitationForRiverMin = 20; // important value
        this.precipitationForRiverMax = 100; // important value

        this.precipitationForLakeMin = 100; // important value
        this.precipitationForLakeMax = 500; // important value
        this.lakeHeightPrecipitationMultiplier = 7; // important value

        this.riverWidthMax = 10 / (this.numOfPoints / 1000);
        this.riverWidthMin = 1;
        this.riverWidthDistanceStrengthControl = 10; // important value


        this.initialPeakHeight = 100;
        this.highestPeak = this.initialPeakHeight;
        this.lowestDepth = -this.initialPeakHeight;
        this.longestRiverLength = 0;

        this.showOceanDepth = true;
        this.grayscaleHeightmap = false;
        this.drawBiomesDelaunayStyle = false;


        this.windLineLength = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        this.canvasPartitions;
        this.windLines;
        this.riverRoots;
        this.allRiverPaths;
        this.allRiverSubPathSteps;
        this.tilesSurroundedByRivers;
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
        let randTiles = this.getRandomTiles(this.numberOfRandomInitialPeaksOrTrenchesMin, this.numberOfRandomInitialPeaksOrTrenchesMax);
        randTiles.forEach(tile => {
            let dir = (this.rng() < this.chanceForLand) ? 1 : -1;
            tile.setHeight(dir * this.initialPeakHeight)
        });
        let queue = [
            ...randTiles
        ];
        let decrement;

        while (queue.length) {
            decrement = this.randRange(this.heightDecrementMin, this.heightDecrementMax) / 100;

            let cur = queue.shift();
            let curHeight = cur.height;
            (curHeight >= 0) ? this.landTiles[cur.idx] = cur : this.oceanTiles[cur.idx] = cur;
            let neighbors = cur.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let n = this.getTile(neighbors[i]);
                if (n.height === null) {
                    n.height = Math.round(curHeight * decrement);
                    queue.push(n);
                    if (n.height > this.highestPeak) this.highestPeak = n.height;
                    if (n.height < this.lowestDepth) this.lowestDepth = n.height;
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

    getLandHeightmapColor = (h) =>
        (this.grayscaleHeightmap) ?
            getLerpedColor('#7f7f7f', '#ffffff', this.highestPeak, h - 1) :
            getLerpedColor('#7DC9A6', '#9b0101', this.highestPeak, h - 1, true);

    getOceanHeightmapColor = (h) => {
        if (this.grayscaleHeightmap) {
            return (this.showOceanDepth) ?
                getLerpedColor('#7f7f7f', '#000000', Math.abs(this.lowestDepth), Math.abs(h) - 1) :
                '#000000';
        } else {
            return (this.showOceanDepth) ?
                getLerpedColor(BIOMES_COLORS['OCEAN'], BIOMES_COLORS['DEEP_OCEAN'], Math.abs(this.lowestDepth), Math.abs(h) - 1) :
                BIOMES_COLORS['OCEAN'];
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

    defineTileset = () => {
        this.allPoints = this.generateRandomPoints(this.numOfPoints);
        this.initVoronoi(this.allPoints);
        this.initTiles(this.allPoints);
    }

    relaxVoronoi = (times) => {
        for (let i = 0; i < times; i++) {
            this.allPoints = this.lloydRelaxation(this.allPoints);
            this.createVoronoi(this.allPoints);
        }
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

    resetTerrainHeight = () => {
        for (let tile of this.tiles) {
            tile.resetHeight();
        }
    }

    resetTileTypes = () => {
        this.landTiles = {};
        this.oceanTiles = {};
        this.lakeTiles = {};
    }

    resetCoastline = () => this.coastline = [];

    resetPrecipitation = () => this.tiles.forEach(t => t.resetPrecipitation());

    resetRivers = () => {
        for (let tile of this.tiles) {
            tile.resetRiver();
        }
        this.longestRiverLength = 0;
    }

    resetLakes = () => {
        Object.assign(this.landTiles, this.lakeTiles);
        this.lakeTiles = {};
    }

    resetHumidity = () => {
        this.resetPrecipitation();
        this.resetRivers();
        this.resetLakes();
    }

    createCanvasPartitions = () => {
        let canvasPartitions = [];
        let partitionSizeX = canvas.width / 8;
        let partitionSizeY = canvas.height / 8;
        for (let x = 0; x < canvas.width; x += partitionSizeX) {
            for (let y = 0; y < canvas.height; y += partitionSizeY) {
                let top = [x, y, x + partitionSizeX, y];
                let bottom = [x, y + partitionSizeY, x + partitionSizeX, y + partitionSizeY];
                let left = [x, y, x, y + partitionSizeY];
                let right = [x + partitionSizeX, y, x + partitionSizeX, y + partitionSizeY];
                let bounds = [top, bottom, left, right];
                let partition = {
                    bounds,
                    'tiles': {
                        'landTiles': {},
                        'oceanTiles': {}
                    }
                }
                canvasPartitions.push(partition);
            }
        }
        return canvasPartitions;
    }

    addTilesToCanvasPartitions = (canvasPartitions) => {
        const isPointInPartition = (point, partition) => {
            let x = point[0];
            let y = point[1];
            let topLine = partition.bounds[0];
            let leftLine = partition.bounds[2];
            return x > topLine[0] && x < topLine[2] && y > leftLine[1] && y < leftLine[3];
        }

        for (let i = 0; i < this.allPoints.length; i++) {
            let point = this.allPoints[i];
            for (let j = 0; j < canvasPartitions.length; j++) {
                let inPartition = isPointInPartition(point, canvasPartitions[j])
                if (inPartition) {
                    let type = (this.landTiles[i]) ? 'landTiles' : 'oceanTiles';
                    canvasPartitions[j].tiles[type][i] = (this.getTile(i));
                }
            }
        }

        return canvasPartitions;
    }

    initCanvasPartitions = () => this.canvasPartitions = this.addTilesToCanvasPartitions(this.createCanvasPartitions());

    defineTerrain = () => {
        this.resetTerrainHeight();
        this.resetTileTypes();
        this.resetCoastline();

        this.setTilesHeight();
        this.determineCoastline();
        this.initCanvasPartitions();
    }

    createWindLines = (windLineLength) => {
        let windLines = [];
        let windAngle = Math.round(this.randRange(0, 360));

        const rotateAroundCenter = (cx, cy, x, y, angle) => {
            let radians = (Math.PI / 180) * angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        // prevailing wind direction
        for (let idx in this.oceanTiles) {
            let windOffset = Math.round(this.randRange(-5, 5));
            let tile = this.oceanTiles[idx];
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

    connectPartitionsToLines = (canvasPartitions, windLines) => {
        let windLinesCopy = [...windLines];
        for (let i = 0; i < windLinesCopy.length; i++) {
            let line = windLinesCopy[i];
            let intersectedPartitions = this.findPartitionsIntersectingLine(canvasPartitions, line.line);
            line.intersectedPartitions = intersectedPartitions;
        }
        return windLinesCopy;
    }

    findPartitionsIntersectingLine = (canvasPartitions, line1) => {
        let intersectedPartitions = [];
        for (let i = 0; i < canvasPartitions.length; i++) {
            let cur = canvasPartitions[i];
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

    findTilesIntersectingLineThroughPartitions = (windLines) => {
        let windLinesCopy = [...windLines];
        for (let i = 0; i < windLinesCopy.length; i++) {
            let line = windLinesCopy[i];
            for (let j = 0; j < line.intersectedPartitions.length; j++) {
                let tiles = this.findTilesIntersectingLine(line.intersectedPartitions[j].tiles.landTiles, line.line);
                line.intersectedTiles.push(...tiles);
            }
        }
        return windLinesCopy;
    }

    findTilesIntersectingLine = (tileType, line1) => {
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

    initWindLines = (windLineLength, canvasPartitions) => {
        let windLines = [];

        windLines = this.createWindLines(windLineLength);
        windLines = this.connectPartitionsToLines(canvasPartitions, windLines);
        windLines = this.findTilesIntersectingLineThroughPartitions(windLines);

        return windLines;
    }

    getTilesByHeight = (tiles) => {
        let tilesArr = [];
        for (let idx in tiles) {
            let tile = this.getTile(idx);
            tilesArr.push(tile);
        }
        return tilesArr.sort((a, b) => b.height - a.height);
    }

    // ____________________________________________________________________________________________________________
    // precipitation and humidity

    defineWindLines = (windLines = null) => this.windLines = (windLines) ? windLines : this.initWindLines(this.windLineLength, this.canvasPartitions);

    defineHumidity = () => {
        this.resetHumidity();

        this.riverRoots = this.initWaterOnLand(this.windLines);

        [this.allRiverPaths, this.allRiverSubPathSteps] = [...this.defineRiversOnVoronoiEdges(this.riverRoots)];
        this.tilesSurroundedByRivers = this.getTilesSurroundedByRivers(this.allRiverSubPathSteps);
    }

    calculatePrecipitation = (windLines) => {
        for (let line of windLines) {
            let tiles = line.intersectedTiles;
            let totalWaterAvailable = this.oceanTileWaterVapor * this.windSpeed;
            let tileDistances = [];
            // get tile distance
            for (let idx of tiles) {
                let tile = this.getTile(idx);
                let dist = getDistanceBetweenPoints(line.line, tile.centroid);
                tileDistances.push([idx, dist]);
            }

            // sort tiles by ascending distance
            tileDistances = tileDistances.sort((a, b) => a[1] - b[1]);

            // get tile precipitation
            for (let cur of tileDistances) {
                if (totalWaterAvailable <= 0) break;
                let tile = this.getTile(cur[0]);
                let dist = cur[1];
                let linePercentVal = this.windLineLength / 100;
                let percentDistFromLineStart = dist / linePercentVal / 100;
                let distPrecipitation = this.oceanTileWaterVapor - (this.oceanTileWaterVapor * percentDistFromLineStart);
                let heightPrecipitation = tile.height * this.heightPrecipitationMultiplier;

                let precipitation = distPrecipitation + heightPrecipitation;
                if (totalWaterAvailable - precipitation < 0) precipitation = totalWaterAvailable;
                totalWaterAvailable -= precipitation;

                tile.precipitation += Math.round(precipitation);
                tile.totalPrecipitationPassedThroughTile += Math.round(precipitation);
            }
        }
    }

    defineRivers = () => {
        let tilesByHeight = this.getTilesByHeight(this.landTiles);
        let riverNodes = [];

        for (let i = 0; i < tilesByHeight.length; i++) {
            let tile = tilesByHeight[i];
            let neighbors = tile.neighbors;
            let lowestNeighbor;

            for (let idx of neighbors) {
                let n = this.getTile(idx);
                if (!lowestNeighbor || n.height < lowestNeighbor.height) lowestNeighbor = n;
            }

            if (tile.precipitation > this.precipitationForRiverMin) {
                let precipitationForRiverUpperBound = (tile.precipitation > this.precipitationForRiverMax) ? this.precipitationForRiverMax : tile.precipitation;
                let precipitationForRiverLeftInTile = Math.round(this.randRange(this.precipitationForRiverMin, precipitationForRiverUpperBound));
                let flowAmount = tile.precipitation - precipitationForRiverLeftInTile;

                lowestNeighbor.precipitation += flowAmount;
                lowestNeighbor.totalPrecipitationPassedThroughTile += flowAmount;
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

        let riverRoots = new Set();

        riverNodes.forEach(river => {
            let root = river.getRoot();
            let distToRoot = getDistanceBetweenPoints(river.getRoot().tile.centroid, river.tile.centroid);
            if (distToRoot > this.longestRiverLength) this.longestRiverLength = distToRoot;
            river.distToRoot = distToRoot;
            riverRoots.add(root);
        });

        return [...riverRoots];
    }

    defineLakes = (rivers) => {
        let possibleLakes = [];
        // find possible lakes from lowest river tile on land
        rivers.forEach(river => (!this.oceanTiles[river.tile.idx] && river.tile.precipitation > this.precipitationForRiverMin) ? possibleLakes.push(river.tile) : false);

        // define lakes
        for (let i = 0; i < possibleLakes.length; i++) {
            let mbLake = possibleLakes[i];
            if (mbLake.precipitation >= this.precipitationForLakeMin) {
                this.lakeTiles[mbLake.idx] = mbLake;
                delete this.landTiles[mbLake.idx];
                possibleLakes.splice(i, 1);
                i--;
            }
        }
    }

    expandLakes = () => {
        let queue = [];
        for (let idx in this.lakeTiles) {
            let lake = this.lakeTiles[idx];
            queue.push(lake);
        }

        while (queue.length > 0) {
            let lake = queue.shift();
            let neighbors = lake.neighbors;

            let neighborsByHeight = [];
            for (let n of neighbors) {
                neighborsByHeight.push(this.getTile(n));
            }
            neighborsByHeight.sort((a, b) => a.height - b.height);
            let waterSpreadAverage = Math.round(lake.precipitation / neighbors.length);
            let totalWaterAvailable = lake.precipitation - this.precipitationForLakeMax;

            for (let neighbor of neighborsByHeight) {
                if (totalWaterAvailable <= 0) break;
                if (this.oceanTiles[neighbor.idx]) break;
                if (this.lakeTiles[neighbor.idx]) continue;

                let heightDifference = neighbor.height - lake.height;

                let waterMoved = waterSpreadAverage + ((this.oceanTileWaterVapor - heightDifference) * this.lakeHeightPrecipitationMultiplier) - heightDifference * this.lakeHeightPrecipitationMultiplier;
                if (waterMoved > totalWaterAvailable) waterMoved = totalWaterAvailable;

                neighbor.precipitation += waterMoved;
                neighbor.totalPrecipitationPassedThroughTile += waterMoved;
                lake.precipitation -= waterMoved;
                totalWaterAvailable -= waterMoved;

                if (neighbor.precipitation >= this.precipitationForLakeMin) {
                    this.lakeTiles[neighbor.idx] = neighbor;
                    delete this.landTiles[neighbor.idx];

                    queue.push(neighbor);
                }
            }
        }
    }

    initWaterOnLand = (windLines) => {
        this.calculatePrecipitation(windLines);
        let riverRoots = this.defineRivers();
        this.defineLakes(riverRoots);
        this.expandLakes();

        return riverRoots;
    }

    // _________________________________________
    // river path

    voronoiFindPathsBetweenTwoVertices = (tile, start, end) => {
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

    defineRiversOnVoronoiEdges = (riverRoots) => {
        let queue = [...riverRoots];
        let visitedSet = {};

        let allRiverPaths = [];
        let allRiverSubPathSteps = new Set(); // allRiverSubPathSteps is used to find special biome tiles (e.g. a tile surrounded by rivers on all sides)
        // get paths for all rivers
        while (queue.length > 0) {
            let cur = queue.shift();
            let children = cur.children;

            if (children.length === 0) {
                let leafRoot = cur.getRoot();
                if (cur.distToRoot > leafRoot.farthestLeafDist) {
                    leafRoot.farthestLeafDist = cur.distToRoot;
                }
                continue;
            };

            let start = (visitedSet[cur.tile.idx]) ? visitedSet[cur.tile.idx] : cur.tile.polygon[Math.round(this.randRange(0, cur.tile.polygon.length - 1))];
            let riverPath = [];
            for (let child of children) {
                if (visitedSet[child.tile.idx]) continue;
                let edge = this.getEdgeBetweenTiles(cur.tile, child.tile);
                let randConnectingPoint = (this.rng() < 0.5) ? edge[0] : edge[1];

                // don't draw river inside the ocean
                if (!this.oceanTiles.hasOwnProperty(cur.tile.idx)) {
                    let possibleRiverPaths = this.voronoiFindPathsBetweenTwoVertices(cur.tile, start, randConnectingPoint);
                    let riverSubPath = possibleRiverPaths[0]; // 0 is short path, 1 is long path

                    for (let i = 0; i < riverSubPath.length - 1; i++) {
                        // allRiverSubPathSteps is used to find special biome tiles (e.g. a tile surrounded by rivers on all sides)
                        let p1 = riverSubPath[i];
                        let p2 = riverSubPath[i + 1];

                        let p1Str = `x${p1[0]}y${p1[1]}`;
                        let p2Str = `x${p2[0]}y${p2[1]}`;

                        let step = p1Str + p2Str;
                        allRiverSubPathSteps.add(step);
                    }

                    riverPath.push(riverSubPath);
                }

                visitedSet[child.tile.idx] = randConnectingPoint;
                queue.push(child);
            }

            allRiverPaths.push([cur, riverPath]);
        }

        return [allRiverPaths, allRiverSubPathSteps];
    }

    getTilesSurroundedByRivers = (allRiverSubPathSteps) => {
        let tilesSurroundedByRivers = [];

        for (let idx in this.landTiles) {
            let tile = this.getTile(+idx);
            let numOfEdges = tile.polygon.length - 1;

            // first and last polygon vertices are the same
            for (let i = 0; i <= tile.polygon.length - 2; i++) {
                let p1 = tile.polygon[i];
                let p2 = tile.polygon[i + 1];

                let p1Str = `x${p1[0]}y${p1[1]}`;
                let p2Str = `x${p2[0]}y${p2[1]}`;

                let stepDir1 = p1Str + p2Str;
                let stepDir2 = p2Str + p1Str;


                if (!allRiverSubPathSteps.has(stepDir1) && !allRiverSubPathSteps.has(stepDir2)) {
                    continue;
                }

                tile.numOfRiversOnEdges++;

                if (numOfEdges === tile.numOfRiversOnEdges) {
                    tilesSurroundedByRivers.push(+idx);
                }
            }
        }

        return tilesSurroundedByRivers;
    }

    // _________________________________________
    // biomes

    defineTemperature = () => {
        // each unit of tile height = 10 meters (i.e. 100 tile height = 1km)
        let tempDecreasePerKm = 10;
        for (let tile of this.tiles) {
            let height = (tile.height < 0) ? 0 : tile.height;
            let temperature = this.seaLevelTemperature - (height / tempDecreasePerKm);
            tile.setTemperature(Math.round(temperature));
        }
    }

    clamp = (number, min, max) => Math.max(min, Math.min(number, max));

    getTemperatureTypeIdx = (temp) => this.clamp(Math.ceil(temp / 5), 0, 8);

    getHumidityTypeIdx = (precip) => {
        let humidityLimits = [Number.NEGATIVE_INFINITY, 0, 30, 60, 100, 140, 170, 200, Number.POSITIVE_INFINITY];

        for (let i = 0; i < humidityLimits.length - 1; i++) {
            let a = humidityLimits[i];
            let b = humidityLimits[i + 1]
            if (precip > a && precip <= b) {
                return i;
            }
        }
    }

    getBiomeForTile = (tile) => {
        let t = this.getTemperatureTypeIdx(tile.temperature);
        let h = this.getHumidityTypeIdx(tile.totalPrecipitationPassedThroughTile);
        let biome = BIOMES[t][h];
        biome = this.checkForSpecialBiome(biome, t, h, tile);
        return biome;
    }

    checkForSpecialBiome = (biome, temp, humidity, tile) => {
        let tilesSurroundedByRivers = this.tilesSurroundedByRivers;
        let specialBiomes = {
            "BOG": [!tilesSurroundedByRivers.some(el => el === tile.idx), tile.river === null, (temp >= 1 && temp <= 3), (humidity >= 4 && humidity <= 7)],
            "ELFIN_WOODLAND": [tile.height >= 60, (temp >= 5 && temp <= 7), (humidity >= 5 && humidity <= 6), this.rng() < 0.7],
            "FEN": [tilesSurroundedByRivers.some(el => el === tile.idx), (temp >= 1 && temp <= 3), (humidity >= 2 && humidity <= 5)],
            "MARSH": [tile.river, tile.numOfRiversOnEdges >= 3, (temp >= 3 && temp <= 5), (humidity >= 4 && humidity <= 6), this.rng() < 0.5],
            "OASIS": [(tile.river && !(tile.river.dry) && tile.numOfRiversOnEdges >= 2) || tile.neighbors.some(n => this.lakeTiles[n] && !this.lakeTiles[n].dryLake), temp === 7, (humidity >= 5 && humidity <= 7), this.rng() < 0.5],
            "SWAMP": [tile.river, tile.numOfRiversOnEdges >= 3, (temp >= 1 && temp <= 6), (humidity >= 5 && humidity <= 6), this.rng() < 0.5],
            "TEMPERATE_FRESHWATER_SWAMP_FOREST": [tilesSurroundedByRivers.some(el => el === tile.idx), tile.numOfRiversOnEdges >= 2, tile.river, (temp >= 1 && temp <= 3), (humidity >= 5 && humidity <= 7)],
            "TROPICAL_FRESHWATER_SWAMP_FOREST": [tilesSurroundedByRivers.some(el => el === tile.idx), tile.numOfRiversOnEdges >= 2, tile.river, (temp >= 4 && temp <= 6), (humidity >= 5 && humidity <= 7)]
        };

        let eligibleBiomes = [];

        for (let curBiome in specialBiomes) {
            let conditions = specialBiomes[curBiome];
            if (conditions.length && conditions.every(cond => cond)) {
                // if all conditions are met
                eligibleBiomes.push(curBiome);
            }
        }

        if (eligibleBiomes.length) {
            let randEligibleBiome = Math.floor(0, eligibleBiomes.length);
            biome = eligibleBiomes[randEligibleBiome];
        }

        return biome;
    }

    checkForRiversModifiers = (rivers) => {
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

            river.dry = !!(tile.precipitation < this.precipitationForRiverMin + Math.exp((tile.temperature - 14) / 5));
            river.frozen = !!(tile.temperature < 0);
        }
    }

    checkForLakesModifiers = () => {
        for (let idx in this.lakeTiles) {
            let tile = this.getTile(+idx);
            tile.dryLake = !!(tile.precipitation < this.precipitationForLakeMin + Math.exp((tile.temperature - 14) / 5));
            tile.frozenLake = !!(tile.temperature < 0);
        }
    }

    defineBiomes = () => {
        this.checkForRiversModifiers(this.riverRoots);
        this.checkForLakesModifiers();

        for (let idx in this.landTiles) {
            let tile = this.getTile(+idx);
            let biome = this.getBiomeForTile(tile);
            tile.biome = biome;
        }
    }

    // _________________________________________
    // run methods

    run = () => {
        this.defineTileset();
        this.defineTerrain();
        this.defineWindLines();
        this.defineHumidity();
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }

    changeMapTerrain = () => {
        this.defineTerrain();
        this.defineWindLines();
        this.defineHumidity();
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }

    changeMapWindSpeed = (newSpeed) => {
        this.windSpeed = newSpeed;
        this.defineWindLines(this.windLines);
        this.defineHumidity();
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }

    changeMapWindDirection = () => {
        this.defineWindLines();
        this.defineHumidity();
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }


    changeMapTemperature = (newTemp) => {
        this.seaLevelTemperature = newTemp;
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }

    changeMapHumidity = (newOceanTileWaterVapor) => {
        this.oceanTileWaterVapor = newOceanTileWaterVapor;
        this.defineHumidity();
        this.defineTemperature();
        this.defineBiomes();

        this.drawAll();
    }

    calcDewpoint = (temp, relativeHumidity) => 243.04 * (Math.log(relativeHumidity / 100) + ((17.625 * temp) / (243.04 + temp))) / (17.625 - Math.log(relativeHumidity / 100) - ((17.625 * temp) / (243.04 + temp))); // degrees

    calcRelativeHumidity = (temp, dewpoint) => 100 * Math.exp((17.625 * dewpoint) / (243.04 + dewpoint)) / Math.exp((17.625 * temp) / (243.04 + temp)); // percent

    calcTemperature = (dewpoint, relativeHumidity) => 243.04 * (((17.625 * dewpoint) / (243.04 + dewpoint)) - Math.log(relativeHumidity / 100)) / (17.625 + Math.log(relativeHumidity / 100) - ((17.625 * dewpoint) / (243.04 + dewpoint))); // degrees

    tempAndRelativeHumidityToMoisture = (temp = 14, relativeHumidityPercent = 100) => +(relativeHumidityPercent * 0.42 * Math.exp(temp * 10 * 0.006235398) / 10).toFixed(2); //absolute moisture; used for how much water vapor comes out of ocean tiles

    updateTemperature = (newTemp, newRH) => {
        this.seaLevelTemperature = newTemp;
        this.relativeHumidity = newRH;

        temperatureSpan.innerText = this.seaLevelTemperature;
        relativeHumidityInput.value = this.relativeHumidity;
        relativeHumiditySpan.innerText = this.relativeHumidity;

        dewpointInput.max = this.calcDewpoint(this.seaLevelTemperature, 100);

        this.applyUpdatesToMapFromInputs();
    }

    updateRelativeHumidity = (newRH, newDewpoint) => {
        this.relativeHumidity = newRH;
        this.dewpoint = newDewpoint;
        relativeHumiditySpan.innerText = this.relativeHumidity;
        dewpointInput.value = this.dewpoint;
        dewpointSpan.innerText = this.dewpoint;

        this.applyUpdatesToMapFromInputs();
    }

    updateDewpoint = (newDewpoint, newTemp) => {
        this.dewpoint = newDewpoint;
        this.seaLevelTemperature = newTemp;

        dewpointSpan.innerText = this.dewpoint;
        temperatureInput.value = this.seaLevelTemperature;
        temperatureSpan.innerText = this.seaLevelTemperature;

        temperatureInput.min = this.dewpoint;

        this.applyUpdatesToMapFromInputs();
    }

    applyUpdatesToMapFromInputs = () => {
        // seaLevelTemperature and relativeHumidity get reassigned the new values from the inputs in previous functions
        this.changeMapTemperature(this.seaLevelTemperature);

        let newOceanTileWaterVapor = this.tempAndRelativeHumidityToMoisture(this.seaLevelTemperature, this.relativeHumidity);
        this.changeMapHumidity(newOceanTileWaterVapor);
    }


    // _________________________________________
    // draw methods

    drawAll = () => {
        this.clearCanvas();
        // this.drawHeightmap();
        // this.drawVoronoi();
        // this.drawDelaunay();
        // this.drawPoints();

        if (this.drawBiomesDelaunayStyle) {
            this.drawBiomesAsTriangles();
        } else {
            this.drawBiomes();
        }
        this.drawOceanHeightmap();
        this.drawCoastline();
        this.drawRivers(this.allRiverPaths, 0.4);
        this.drawLakes();

        // this.drawPartitionBounds(this.canvasPartitions);
        // this.drawAllWindIntersectedPartitions(this.windLines);
        // this.drawWindLines(this.windLines);
        // this.drawWindIntersectedTiles(this.windLines);
        // this.displayPrecipitationValues(this.tiles);
        // this.displayTotalPrecipitationValues(this.tiles);
        // this.displayHeightValues(this.tiles);
        // this.displayTemperatureValues(this.tiles);
        // this.drawTilesSurroundedByRivers(this.tilesSurroundedByRivers);
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

    drawHeightmap = () => {
        this.drawLandHeightmap();
        this.drawOceanHeightmap();
    }

    drawLandHeightmap = () => {
        for (let idx in this.landTiles) {
            let tile = this.getTile(+idx);
            let h = tile.height;
            let color = this.getLandHeightmapColor(h);

            ctx.beginPath();
            this.fillTile(+idx, color);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        for (let idx in this.lakeTiles) {
            let tile = this.getTile(+idx);
            let h = tile.height;
            let color = this.getLandHeightmapColor(h);

            ctx.beginPath();
            this.fillTile(+idx, color);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    drawOceanHeightmap = () => {
        for (let idx in this.oceanTiles) {
            let tile = this.getTile(+idx);
            let h = tile.height;
            let color = this.getOceanHeightmapColor(h);

            ctx.beginPath();
            this.fillTile(+idx, color);
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

    drawTilesSurroundedByRivers = (tilesSurroundedByRivers) => {
        for (let idx of tilesSurroundedByRivers) {
            this.fillTile(+idx, "#FFC0CBaa");
        }
    }

    drawBiomes = () => {
        for (let idx in this.landTiles) {
            let tile = this.getTile(+idx);
            let color = BIOMES_COLORS[tile.biome];
            this.fillTile(+idx, color);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    drawBiomesAsTriangles = () => {
        // helper functions
        const getTriangleColorFromVoronoiTile = (n, fallbackColor) => {
            let t0 = triangles[n * 3 + 0];
            let t1 = triangles[n * 3 + 1];
            let t2 = triangles[n * 3 + 2];

            let p1 = [points[t0 * 2], points[t0 * 2 + 1]];
            let p2 = [points[t1 * 2], points[t1 * 2 + 1]];
            let p3 = [points[t2 * 2], points[t2 * 2 + 1]];

            let centerX = (p1[0] + p2[0] + p3[0]) / 3;
            let centerY = (p1[1] + p2[1] + p3[1]) / 3;

            let voronoiIdx = this.delaunay.find(centerX, centerY);
            let voronoiTile = this.getTile(voronoiIdx);


            let color = (voronoiTile && voronoiTile.biome) ? BIOMES_COLORS[voronoiTile.biome] : fallbackColor;

            return color;
        }

        const edgesOfTriangle = (t) => [3 * t, 3 * t + 1, 3 * t + 2];

        const triangleOfEdge = (e) => Math.floor(e / 3);

        const trianglesAdjacentToTriangle = (t) => {
            let adjacentTriangles = [];
            for (let e of edgesOfTriangle(t)) {
                let opposite = halfedges[e];
                if (opposite >= 0) {
                    adjacentTriangles.push(triangleOfEdge(opposite));
                }
            }
            return adjacentTriangles;
        }

        const getAverageColor = (neighborTriangles, fallbackColor) => {
            let c0 = getTriangleColorFromVoronoiTile(neighborTriangles[0], fallbackColor);
            let c1 = getTriangleColorFromVoronoiTile(neighborTriangles[1], fallbackColor);
            let c2 = getTriangleColorFromVoronoiTile(neighborTriangles[2], fallbackColor);

            let avg1 = getLerpedColor(c0, c1, 3, 1, true);
            let avgColor = getLerpedColor(avg1, c2, 3, 1, true);

            return avgColor;
        }

        // main function logic
        let voronoiVertices = [];

        for (let idx in this.landTiles) {
            let tile = this.getTile(+idx);
            voronoiVertices.push(...tile.polygon);
        }

        let delaunay = Delaunay.from(voronoiVertices);
        let triangles = delaunay.triangles;
        let halfedges = delaunay.halfedges;
        let points = delaunay.points;

        for (let i = 0; i < voronoiVertices.length; i++) {
            let t0 = triangles[i * 3 + 0];
            let t1 = triangles[i * 3 + 1];
            let t2 = triangles[i * 3 + 2];

            let p1 = [points[t0 * 2], points[t0 * 2 + 1]];
            let p2 = [points[t1 * 2], points[t1 * 2 + 1]];
            let p3 = [points[t2 * 2], points[t2 * 2 + 1]];

            let centerX = (p1[0] + p2[0] + p3[0]) / 3;
            let centerY = (p1[1] + p2[1] + p3[1]) / 3;

            let voronoiIdx = this.delaunay.find(centerX, centerY);
            let voronoiTile = this.getTile(voronoiIdx);

            let fallbackColor;

            if (voronoiTile && BIOMES_COLORS[voronoiTile.biome]) {
                fallbackColor = BIOMES_COLORS[voronoiTile.biome];
            } else {
                continue;
            }

            let neighborTriangles = trianglesAdjacentToTriangle(i);
            let avgColor = getAverageColor(neighborTriangles, fallbackColor);

            ctx.fillStyle = avgColor;
            ctx.strokeStyle = avgColor;
            ctx.beginPath();
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
            ctx.lineTo(p3[0], p3[1]);
            ctx.closePath();

            ctx.fill();
            ctx.stroke();
        }
    }

    drawRivers = (allRiverPaths, curveStrength = 0.4) => {
        // draw rivers paths with a curve and varying widths
        let drawnSubPaths = new Set();

        for (let riverNodeAndPath of allRiverPaths) {
            let riverNode = riverNodeAndPath[0];
            let riverPath = riverNodeAndPath[1];
            for (let riverSubPath of riverPath) {
                let points = riverSubPath.flat();
                let v1 = `x${points[0]}y${points[1]}`;
                let v2 = `x${points[points.length - 2]}y${points[points.length - 1]}`;
                let str = v1 + v2; // use ony start and end river path vertices(points)

                if (!drawnSubPaths.has(str)) {
                    // get width based on distance from end/root tile
                    let distToRoot = riverNode.distToRoot;
                    let farthestLeafDistToRoot = riverNode.getRoot().farthestLeafDist;

                    let normalizedDist = (distToRoot - 0) / (farthestLeafDistToRoot - 0);
                    if (normalizedDist === Number.POSITIVE_INFINITY || isNaN(normalizedDist)) {
                        normalizedDist = 0.9;
                    }

                    let distWidth = this.riverWidthMax - Math.round(normalizedDist * this.riverWidthDistanceStrengthControl);
                    if (distWidth < this.riverWidthMin) distWidth = this.riverWidthMin;

                    // get width based on precipitation left in tile
                    let thirdOfPrecipitationRange = Math.round((this.precipitationForRiverMax - this.precipitationForRiverMin) / 3);
                    let precipitationWidth;

                    if (riverNode.tile.precipitation <= this.precipitationForRiverMin + thirdOfPrecipitationRange) {
                        precipitationWidth = 1;
                    } else if (riverNode.tile.precipitation <= this.precipitationForRiverMin + thirdOfPrecipitationRange * 2) {
                        precipitationWidth = 2;
                    } else if (riverNode.tile.precipitation <= this.precipitationForRiverMin + thirdOfPrecipitationRange * 3) {
                        precipitationWidth = 3;
                    } else {
                        precipitationWidth = 4;
                    }

                    let color;

                    if (riverNode.dry) {
                        color = BIOMES_COLORS['DRY_RIVER']
                    } else if (riverNode.frozen) {
                        color = BIOMES_COLORS['FROZEN_RIVER']
                    } else {
                        color = BIOMES_COLORS['RIVER'];
                    }

                    ctx.drawCurve(points, curveStrength);
                    ctx.lineWidth = (distWidth + precipitationWidth) / 2;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = color;
                    ctx.stroke();
                }

                drawnSubPaths.add(str);
            }
        }
    }

    drawLakes = () => {
        for (let idx in this.lakeTiles) {
            let tile = this.getTile(+idx);
            let color;

            if (tile.dryLake) {
                color = BIOMES_COLORS['DRY_LAKE']
            } else if (tile.frozenLake) {
                color = BIOMES_COLORS['FROZEN_LAKE']
            } else {
                color = BIOMES_COLORS['LAKE'];
            }

            this.fillTile(+idx, color);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }

    // _________________________________________
    // extra draw methods

    drawPartitionBounds = (allPartitions) => {
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

    drawWindLines = (windLines) => {
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

    drawAllWindIntersectedPartitions = (windLines) => {
        for (let line of windLines) {
            let intersectedPartitions = line.intersectedPartitions;
            this.drawIntersectedPartitions(intersectedPartitions);
        }
    }

    drawIntersectedPartitions = (intersectedPartitions) => {
        for (let i = 0; i < intersectedPartitions.length; i++) {
            let bounds = intersectedPartitions[i].bounds;
            ctx.beginPath();
            ctx.moveTo(bounds[0][0], bounds[0][1]);
            for (let j = 0; j < bounds.length; j++) {
                let x1 = bounds[j][0];
                let y1 = bounds[j][1];
                let x2 = bounds[j][2];
                let y2 = bounds[j][3];

                ctx.lineTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.fillStyle = '#FF000005';
            ctx.fill();
        }
    }

    drawWindIntersectedTiles = (windLines) => {
        for (let line of windLines) {
            let tiles = line.intersectedTiles;
            for (let idx of tiles) {
                this.fillTile(idx);
            }
        }
    }

    displayHeightValues = (tiles) => {
        for (let idx in tiles) {
            let tile = this.getTile(+idx);
            let x = tile.centroid[0];
            let y = tile.centroid[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(tile.height, x, y);
        }
    }

    displayTemperatureValues = (tiles) => {
        for (let idx in tiles) {
            let tile = this.getTile(+idx);
            let x = tile.centroid[0];
            let y = tile.centroid[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(tile.temperature, x, y);
        }
    }

    displayPrecipitationValues = (tiles) => {
        for (let idx in tiles) {
            let tile = this.getTile(idx);
            let x = tile.centroid[0];
            let y = tile.centroid[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(tile.precipitation, x, y);
        }
    }

    displayTotalPrecipitationValues = (tiles) => {
        for (let idx in tiles) {
            let tile = this.getTile(idx);
            let x = tile.centroid[0];
            let y = tile.centroid[1];
            ctx.fillStyle = "#000000";
            ctx.fillText(tile.totalPrecipitationPassedThroughTile, x, y);
        }
    }
}


let seed = 2546076188;
let initialNumOfPoints = 1000;

let mapGen = new MapGenerator(initialNumOfPoints, seed);
mapGen.run();





// changing temp -> RH
// changing RH -> dewpoint
// changing dewpoint -> temp
// ... -> temp -> RH -> dewpoint -> temp -> ...














temperatureInput.oninput = (e) => {
    let newTemp = +e.target.value;
    let newRH = Math.round(mapGen.calcRelativeHumidity(newTemp, mapGen.dewpoint));

    if (newRH < 1) {
        return console.log(`Relative humidity can't go below 1%`);
    }
    if (newRH > 100) {
        return console.log(`Relative humidity can't exceed 100%`);
    }

    mapGen.updateTemperature(newTemp, newRH);
}

relativeHumidityInput.oninput = (e) => {
    let newRH = +e.target.value;
    let newDewpoint = Math.round(mapGen.calcDewpoint(mapGen.seaLevelTemperature, mapGen.relativeHumidity));

    mapGen.updateRelativeHumidity(newRH, newDewpoint);
}

dewpointInput.oninput = (e) => {
    let newDewpoint = +e.target.value;
    let newTemp = Math.round(mapGen.calcTemperature(newDewpoint, mapGen.relativeHumidity));

    if (newTemp < mapGen.minAllowedTemp) {
        return console.log(`Temperature can't be below ${mapGen.minAllowedTemp}°C`);
    }
    if (newTemp > mapGen.maxAllowedTemp) {
        return console.log(`Temperature can't exceed ${mapGen.maxAllowedTemp}°C`);
    }

    mapGen.updateDewpoint(newDewpoint, newTemp);
}

windSpeedInput.oninput = (e) => {
    mapGen.windSpeed = +e.target.value;

    windSpeedSpan.innerText = mapGen.windSpeed;

    mapGen.changeMapWindSpeed(mapGen.windSpeed);
}

canvas.addEventListener("click", (e) => {
    // let x = e.offsetX;
    // let y = e.offsetY;
    // let cell = mapGen.delaunay.find(x, y);
    // console.log(mapGen.tiles[cell]);
    // let neighbors = mapGen.voronoi.neighbors(cell);

    console.time("run map generation");

    // mapGen.changeTerrain();

    // mapGen.changeWindSpeed(mapGen.windSpeed);
    // console.log(mapGen.windSpeed);
    // mapGen.windSpeed -= 1;

    // mapGen.changeWindDirection();

    // mapGen.changeMapHumidity(15);

    // mapGen.changeTemperature(mapGen.seaLevelTemperature);
    // console.log(mapGen.seaLevelTemperature);
    // mapGen.seaLevelTemperature += 1;

    console.timeEnd("run map generation");
})

// Chaparral = Desert scrub
// Savannas = Tropical grasslands
// Boreal forest = Taiga

// Biomes table
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// |                             | Superarid: <= 0       | Perarid: 0 to 30            | Arid: 30 to 60           | Semiarid: 60 to 100  | Subhumid: 100 to 140  | Humid: 140 to 170           | Perhumid: 170 to 200   | Superhumid: > 200       |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Freezing(polar): <= 0       | Polar desert          | Polar desert                | Polar desert             | Polar desert         | Glacier               | Glacier                     | Glacier                | Glacier                 |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Coldest(subpolar): 0 to 5   | Rocky desert          | Rocky desert                | Rocky desert             | Dry tundra           | Tundra                | Moist tundra                | Wet tundra             | Rain tundra             |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Cold(boreal): 5 to 10       | Subpolar desert       | Dry scrub                   | Subpolar scrub           | Very dry forest      | Boreal dry forest     | Boreal forest               | Boreal wet forest      | Boreal wet forest       |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Cold-temperate: 10 to 15    | Cold desert           | Cool temperate desert scrub | Steppe                   | Dry forest           | Coniferous dry forest | Temperate coniferous forest | Coniferous wet forest  | Coniferous rain forest  |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Temperate: 15 to 20         | Temperate Desert      | Xeric shrubland             | Dry woodland             | Woodland             | Temperate dry forest  | Temperate forest            | Temperate wet forest   | Temperate rain forest   |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Hot-temperate: 20 to 25     | Warm-temperate desert | Desert scrub                | Temperate dry grassland  | Temperate grassland  | Deciduous dry forest  | Temperate deciduous forest  | Wet forest             | Rain forest             |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Hot(subtropical): 25 to 30  | Subtropical desert    | Desert scrub                | Thorn woodland           | Dry savanna          | Subropical dry forest | Subtropical forest          | Subtropical wet forest | Subtropical rain forest |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Hottest(tropical): 30 to 35 | Tropical desert       | Semi-arid desert            | Thorn steppe             | Dry savanna          | Wet savanna           | Dry tropical woodland       | Tropical wet forest    | Tropical rainforest     |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+
// | Scorching: > 35             | Hot desert            | Hot desert                  | Hot desert               | Hot desert           | Hot desert            | Hot desert                  | Hot desert             | Hot desert              |
// +-----------------------------+-----------------------+-----------------------------+--------------------------+----------------------+-----------------------+-----------------------------+------------------------+-------------------------+

// Biomes color table
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// |                             | Superarid: <= 0 | Perarid: 0 to 30 | Arid: 30 to 60 | Semiarid: 60 to 100 | Subhumid: 100 to 140 | Humid: 140 to 170 | Perhumid: 170 to 200 | Superhumid: > 200 |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Freezing(polar): <= 0       | F2F2F2          | F2F2F2           | F2F2F2         | F2F2F2              | FAFEFF               | FAFEFF            | FAFEFF               | FAFEFF            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Coldest(subpolar): 0 to 5   | BFBFBF          | BFBFBF           | BFBFBF         | D5D59D              | C3BA84               | B1A06A            | A8935E               | 9E8551            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Cold(boreal): 5 to 10       | B5AD8B          | B1B280           | ABB377         | A4B36E              | 839F53               | 618A38            | 567C2C               | 567C2C            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Cold-temperate: 10 to 15    | C1BA91          | BDC080           | CBC283         | A4BA6D              | 70AF54               | 61AB4B            | 52A444               | 47A536            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Temperate: 15 to 20         | CCC797          | CACF7F           | B7CF7E         | 8EB468              | 62B65B               | 4CB754            | 45B348               | 37B239            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Hot-temperate: 20 to 25     | D8D49D          | D6DD7F           | BDDE82         | A1D77A              | 65CA68               | 29BC56            | 28BA3C               | 1FBA1F            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Hot(subtropical): 25 to 30  | E4E0A2          | D6DD7F           | D9E683         | D3E373              | 8ACA43               | 5EBA28            | 59BF2D               | 52C62B            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Hottest(tropical): 30 to 35 | EFEDA8          | E9EC97           | ECF18F         | D3E373              | BAD249               | A3CC35            | 86CC2D               | 6DCC1A            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+
// | Scorching: > 35             | FBFAAE          | FBFAAE           | FBFAAE         | FBFAAE              | FBFAAE               | FBFAAE            | FBFAAE               | ADDA6B            |
// +-----------------------------+-----------------+------------------+----------------+---------------------+----------------------+-------------------+----------------------+-------------------+

// _________________________________________

// Special biomes

// Bog - In cool climates with consistently high rainfall (on more than c. 235 days a year), the ground surface may remain waterlogged for much of the time, providing conditions for the development of bog vegetation. A bog or bogland is a wetland that accumulates peat, a deposit of dead plant material—often mosses, and in a majority of cases, sphagnum moss. It is one of the four main types of wetlands.
// Elfin woodland - Elfin woodland, stunted forest at high elevations in tropical wet areas. Its low, gnarled trees are heavily draped with air plants, and its floor is cushioned by mosses and other primitive plants. Elfinwood, or Krummholz, is a similar stunted forest characteristic of most Alpine regions.
// Fen - Average temperature ~10C. A fen is one of the main types of wetlands, the others being grassy marshes, forested swamps, and peaty bogs. Along with bogs, fens are a kind of mire. Fens are minerotrophic peatlands, usually fed by mineral-rich surface water or groundwater.
// Marsh - A marsh is a wetland that is dominated by herbaceous rather than woody plant species. Marshes can often be found at the edges of lakes and streams, where they form a transition between the aquatic and terrestrial ecosystems.They are often dominated by grasses, rushes or reeds. If woody plants are present they tend to be low - growing shrubs, and then sometimes called carrs. Marshes are wetlands, continually or frequently flooded by nearby running bodies of water, that are dominated by emergent soft-stem vegetation and herbaceous plants.
// Oasis - Oases are made fertile when sources of freshwater, such as underground rivers or aquifers, irrigate the surface naturally or via man-made wells.
// Swamp - A swamp is a forested wetland. Swamps are considered to be transition zones because both land and water play a role in creating this environment. Swamps vary in size and are located all around the world. Swamps are wetlands consisting of saturated soils or standing water and are dominated by water-tolerant woody vegetation such as shrubs, bushes, and trees.
// Temperate freshwater swamp forest - Freshwater swamp forests are found in a range of climate zones, from boreal through temperate and subtropical to tropical
// Tropical freshwater swamp forest - Freshwater swamp forests are found in a range of climate zones, from boreal through temperate and subtropical to tropical
