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
    constructor(x, y, type = NODE_TYPES.EMPTY, isEnd = false) {
        this.x = x;
        this.y = y;
        this.parent = null;
        this.type = type;
        this.isEnd = isEnd;
        this.gCost;
        this.hCost;
    }
    getFCost = () => this.gCost + this.hCost;
}

class Grid {
    constructor() {
        this.gridSizeX = 100;
        this.gridSizeY = 50;
        this.nodeSize = 16;
        this.grid = [];
        this.initGrid();
    }

    initGrid = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid.push([]);
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new Node(x, y);
            }
        }
    }

    getNeighbors = (node) => {
        let neighbors = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 & y === 0) continue;

                let adjX = node.x + x;
                let adjY = node.y + y;

                if (
                    adjX >= 0 || adjX < this.gridSizeX ||
                    adjY >= 0 || adjY < this.gridSizeY
                ) {
                    neighbors.push(
                        this.grid[adjX][adjY]
                    );
                }
            }
        }

        return neighbors;
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
        let size = this.nodeSize;
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
            x: Math.floor(x / this.nodeSize),
            y: Math.floor(y / this.nodeSize)
        }
    }
}

class AStar {
    constructor(grid) {
        this.grid = grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = [];
        this.closedList = [];
    }

    calcCost = (nodeA, nodeB) => {
        let distX = Math.abs(nodeA.x - nodeB.x);
        let distY = Math.abs(nodeA.y - nodeB.y);

        if (distX > distY) {
            return 14 * distY + 10 * (distX - distY);
        }
        return 14 * distX + 10 * (distY - distX);
    }
}

let grid = new Grid;
let aStar = new AStar(grid);

grid.drawAllNodes();

canvas.addEventListener('click', (e) => grid.getNodeFromCoordinates(e.offsetX, e.offsetY));