let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

// #region eNums
const NODE_COLORS = {
    EMPTY: "white",
    UNWALKABLE: "black",
    SWAMP: "burlywood",
    START: "green",
    END: "red"
}
Object.freeze(NODE_COLORS);

const NODE_TYPES = {
    EMPTY: "EMPTY",
    UNWALKABLE: 'UNWALKABLE',
    SWAMP: "SWAMP",
    START: "START",
    END: "END"
}
Object.freeze(NODE_TYPES);
// #endregion eNums


class Node {
    constructor(x, y, type = NODE_TYPES.EMPTY) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.walkable = (type === NODE_TYPES.UNWALKABLE) ? false : true;
        this.isEnd = false;
        this.parent = null;
        this.gCost = null;
        this.hCost = null;
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
        let gridX = Math.floor(x / this.nodeSize);
        let gridY = Math.floor(y / this.nodeSize);

        return this.grid[gridX][gridY];
    }
}

class AStar {
    constructor(grid) {
        this.gridClass = grid;
        this.grid = grid.grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = [];
        this.closedList = {};

        this.setStartNode(5, 12);
        this.setEndNode(46, 32);
    }

    setStartNode = (x, y) => {
        let node = this.grid[x][y];
        node.type = NODE_TYPES.START;
        this.startNode = node;
    }

    setEndNode = (x, y) => {
        let node = this.grid[x][y];
        node.type = NODE_TYPES.END;
        node.isEnd = true;
        this.endNode = node;
    }

    findPath = () => {
        console.log('finding path')
        this.addToOpenList(this.startNode);

        while (this.openList.length > 0) {
            let curNode = this.openList.shift();

            if (curNode.isEnd) {
                console.log("found end: ", curNode);
                return true;
            }

            this.addToClosedList(curNode);

            let neighbors = this.gridClass.getNeighbors(curNode);
            for (let i = 0; i < neighbors.length; i++) {
                let adjNode = neighbors[i];
                if (adjNode.walkable && !this.checkClosedList(adjNode)) {
                    if (adjNode.gCost === null && adjNode.hCost === null) {
                        adjNode.gCost = this.calcCost(this.startNode, adjNode);
                        adjNode.hCost = this.calcCost(this.endNode, adjNode);
                        adjNode.parent = curNode;

                        this.addToOpenList(adjNode);
                    } else if (adjNode.gCost > this.calcCost(this.startNode, adjNode)
                        ||
                        adjNode.hCost > this.calcCost(this.endNode, adjNode)
                    ) {
                        adjNode.gCost = this.calcCost(this.startNode, adjNode);
                        adjNode.hCost = this.calcCost(this.endNode, adjNode);
                        adjNode.parent = curNode;
                    }
                }
            }
        }

        console.log("Path doesn't exist");
        return "Path doesn't exist";
    }

    calcCost = (nodeA, nodeB) => {
        let distX = Math.abs(nodeA.x - nodeB.x);
        let distY = Math.abs(nodeA.y - nodeB.y);

        if (distX > distY) {
            return 14 * distY + 10 * (distX - distY);
        }
        return 14 * distX + 10 * (distY - distX);
    }

    findOpenListInsertIdx = (node) => {
        let target = node.getFCost();
        let openList = this.openList;

        if (openList.length === 0 || target <= openList[0].getFCost()) return 0;
        if (target >= openList[openList.length - 1].getFCost()) return openList.length;

        let l = 0;
        let r = openList.length - 1;

        while (l <= r) {
            let midIdx = Math.ceil(l + (r - l) / 2);
            let cur = openList[midIdx].getFCost();
            let adj = openList[midIdx - 1].getFCost();

            if (cur >= target && adj <= target) {
                return midIdx;
            } else if (cur < target) {
                l = midIdx + 1;
            } else {
                r = midIdx - 1;
            }
        }
    }

    addToOpenList = (node) => {
        let idx = this.findOpenListInsertIdx(node);
        this.openList.splice(idx, 0, node);
    }

    getKey = (x, y) => {
        return `x${x}y${y}`;
    }

    addToClosedList = (node) => {
        let key = this.getKey(node.x, node.y);
        this.closedList[key] = node;
    }

    checkClosedList = (node) => {
        let key = this.getKey(node.x, node.y);
        return !!this.closedList[key];
    }
}

let grid = new Grid;
let aStar = new AStar(grid);

grid.drawAllNodes();

canvas.addEventListener('click', () => aStar.findPath());
// canvas.addEventListener('click', (e) => grid.getNodeFromCoordinates(e.offsetX, e.offsetY));