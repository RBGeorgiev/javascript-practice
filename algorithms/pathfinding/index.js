let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

class TileMap {
    constructor() {
        this.columns = 100;
        this.rows = 50;
        this.tileSize = 16;
        this.tilemap = [];
        this.initTileMap()
    }

    getTile = (x, y) => {
        return this.tilemap[x][y];
    }

    setTile = (x, y, val) => {
        return this.tilemap[x][y] = val;
    }

    initTileMap = () => {
        for (let i = 0; i < this.columns; i++) {
            this.tilemap.push(Array(this.rows).fill(0));
        }
    }

    drawTile = (x, y, size) => {
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        ctx.fillStyle = "white";
        ctx.lineWidth = 1;
        ctx.rect(x, y, size, size);
        ctx.stroke();
        ctx.fill();
    }

    drawAllTiles = () => {
        let size = this.tileSize;
        for (let x = 0; x < this.tilemap.length; x++) {
            for (let y = 0; y < this.tilemap[x].length; y++) {
                let xPos = size * x;
                let yPos = size * y;
                this.drawTile(xPos, yPos, size);
            }
        }
    }
}

let tilemap = new TileMap;

tilemap.drawAllTiles();

