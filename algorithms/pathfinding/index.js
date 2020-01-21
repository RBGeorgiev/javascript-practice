let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

const TILE_COLORS = {
    START: "lightgreen",
    END: "red",
    OPEN_LIST: "lightblue",
    CLOSED_LIST: "blue",
    PATH: "orange"
}
Object.freeze(TILE_COLORS);

const TILE_TYPES = {
    EMPTY: 0,
    START: 1,
    END: 2,
    OPEN_LIST: 3,
    CLOSED_LIST: 4,
    PATH: 5
}
Object.freeze(TILE_TYPES);

class TileMap {
    constructor() {
        this.columns = 100;
        this.rows = 50;
        this.tileSize = 16;
        this.tilemap = [];
        this.initTileMap();
    }

    getTile = (x, y) => {
        return this.tilemap[x][y];
    }

    setTile = (x, y, type) => {
        return this.tilemap[x][y] = type;
    }

    initTileMap = () => {
        for (let i = 0; i < this.columns; i++) {
            this.tilemap.push(Array(this.rows).fill(0));
        }
    }

    drawTile = (x, y, size, color) => {
        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.rect(x, y, size, size);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fill();
    }

    drawAllTiles = () => {
        let size = this.tileSize;
        for (let x = 0; x < this.tilemap.length; x++) {
            for (let y = 0; y < this.tilemap[x].length; y++) {
                let xPos = size * x;
                let yPos = size * y;
                let color = this.getTileColor(x, y);
                this.drawTile(xPos, yPos, size, color);
            }
        }
    }

    getTileColor = (x, y) => {
        let color;
        let tile = this.getTile(x, y);

        switch (tile) {
            case 1:
                color = TILE_COLORS.START;
                break;
            case 2:
                color = TILE_COLORS.END;
                break;
            case 3:
                color = TILE_COLORS.OPEN_LIST;
                break;
            case 4:
                color = TILE_COLORS.CLOSED_LIST;
                break;
            case 5:
                color = TILE_COLORS.PATH;
                break;
            default:
                color = "white";
        }

        return color;
    }

    getTileFromCoordinates = (x, y) => {
        return {
            x: Math.floor(x / this.tileSize),
            y: Math.floor(y / this.tileSize)
        }
    }
}

class Node {
    constructor(x, y, parent = null, isEnd = false) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.isEnd = isEnd;
    }
}

class AStar {
    constructor(tilemap) {
        this.tilemap = tilemap;
        this.startNode = null;
        this.endNode = null;
        this.openList = {};
        this.closedList = {};

        this.setStartNode(5, 3);
        this.setEndNode(65, 4);
    }

    setStartNode = (x, y) => {
        this.startNode = new Node(x, y);
        this.tilemap.setTile(x, y, TILE_TYPES.START);
    }

    setEndNode = (x, y) => {
        this.endNode = new Node(x, y, null, true);
        this.tilemap.setTile(x, y, TILE_TYPES.END);
    }

    getKey = (x, y) => {
        return `x${x}y${y}`;
    }
}

let tilemap = new TileMap;
let aStar = new AStar(tilemap);

tilemap.drawAllTiles();

canvas.addEventListener('click', (e) => tilemap.getTileFromCoordinates(e.offsetX, e.offsetY));