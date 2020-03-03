let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Grid {
    constructor() {
        this.width = 50;
        this.height = 25;
        this.nodeSize = canvas.width / this.width;
        this.grid = [];
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.drawNode(x, y);
            }
        }
    }

    drawNode = (x, y) => {
        let posX = x * this.nodeSize;
        let posY = y * this.nodeSize;
        let color = "lightgrey";

        ctx.strokeStyle = color;
        ctx.rect(posX, posY, this.nodeSize, this.nodeSize);
        ctx.stroke();
    }

    getNode = (x, y) => this.grid[x][y];

    init = () => {
        for (let x = 0; x < this.width; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.grid[x][y] = new Node(x, y);
            }
        }
    }
}

let grid = new Grid;
grid.init();
grid.drawAllNodes();