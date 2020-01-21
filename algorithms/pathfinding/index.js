let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

// #region eNums
const NODE_COLORS = {
    EMPTY: "white",
    UNWALKABLE: "black",
    SWAMP: "burlywood"
}
Object.freeze(NODE_COLORS);

const NODE_TYPES = {
    EMPTY: "EMPTY",
    UNWALKABLE: 'UNWALKABLE',
    SWAMP: "SWAMP"
}
Object.freeze(NODE_TYPES);
// #endregion eNums


class Node {
    constructor(type = NODE_TYPES.EMPTY, isEnd = false) {
        this.parent = null;
        this.type = type;
        this.isEnd = isEnd;
    }
}

class Grid {
    constructor() {
        this.columns = 100;
        this.rows = 50;
        this.gridSize = 16;
        this.grid = [];
        this.initGrid();
    }

    initGrid = () => {
        for (let x = 0; x < this.columns; x++) {
            this.grid.push([]);
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = new Node;
            }
        }
    }

    getNode = (x, y) => {
        return this.grid[x][y];
    }

    setNodeType = (x, y, type) => {
        return this.grid[x][y].type = type;
    }

    drawNode = (x, y, size, color) => {
        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.rect(x, y, size, size);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fill();
    }

    drawAllNodes = () => {
        let size = this.gridSize;
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                let xPos = size * x;
                let yPos = size * y;
                let color = this.getNodeColor(x, y);
                this.drawNode(xPos, yPos, size, color);
            }
        }
    }

    getNodeColor = (x, y) => {
        let node = this.getNode(x, y);
        return NODE_COLORS[node.type];
    }

    getNodeFromCoordinates = (x, y) => {
        return {
            x: Math.floor(x / this.gridSize),
            y: Math.floor(y / this.gridSize)
        }
    }
}

class AStar {
    constructor(grid) {
        this.grid = grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = {};
        this.closedList = {};
    }

    getKey = (x, y) => {
        return `x${x}y${y}`;
    }
}

let grid = new Grid;
let aStar = new AStar(grid);

grid.drawAllNodes();

canvas.addEventListener('click', (e) => grid.getNodeFromCoordinates(e.offsetX, e.offsetY));