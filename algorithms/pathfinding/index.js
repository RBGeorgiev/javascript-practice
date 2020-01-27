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
    END: "red",
    PATH: "orange",
    OPEN_LIST: "lightblue",
    CLOSED_LIST: "cornflowerblue"
}
Object.freeze(NODE_COLORS);

const NODE_TYPES = {
    EMPTY: "EMPTY",
    UNWALKABLE: 'UNWALKABLE',
    SWAMP: "SWAMP",
    START: "START",
    END: "END",
    PATH: "PATH",
    OPEN_LIST: "OPEN_LIST",
    CLOSED_LIST: "CLOSED_LIST"
}
Object.freeze(NODE_TYPES);
// #endregion eNums


class Node {
    constructor(x, y, type = NODE_TYPES.EMPTY) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.unwalkable = false;
        this.isEnd = false;
        this.parent = null;
        this.gCost = null;
        this.hCost = null;
    }

    getFCost = () => this.gCost + this.hCost;

    setGCost = (val) => this.gCost = val;

    setHCost = (val) => this.hCost = val;

    setParent = (parent) => this.parent = parent;

    setType = (type) => {
        this.type = type;
        this.unwalkable = !!(type === NODE_TYPES.UNWALKABLE);
        this.isEnd = !!(type === NODE_TYPES.END);
    }

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

    getNode = (x, y) => this.grid[x][y];

    getNeighbors = (node) => {
        let neighbors = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 & y === 0) continue;

                let adjX = node.x + x;
                let adjY = node.y + y;

                if (
                    adjX >= 0 && adjX < this.gridSizeX &&
                    adjY >= 0 && adjY < this.gridSizeY
                ) {
                    neighbors.push(
                        this.getNode(adjX, adjY)
                    );
                }
            }
        }

        return neighbors;
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

        return this.getNode(gridX, gridY);
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

        this.grid[6][0].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][1].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][2].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][3].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][4].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][5].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][6].setType(NODE_TYPES.UNWALKABLE);
        this.grid[6][7].setType(NODE_TYPES.UNWALKABLE);
        this.grid[5][7].setType(NODE_TYPES.UNWALKABLE);
        this.grid[4][7].setType(NODE_TYPES.UNWALKABLE);
        this.grid[3][7].setType(NODE_TYPES.UNWALKABLE);

        this.setStartNode(12, 2);
        this.setEndNode(4, 2);
    }

    setStartNode = (x, y) => {
        let node = this.gridClass.getNode(x, y);
        node.setType(NODE_TYPES.START);
        this.startNode = node;
    }

    setEndNode = (x, y) => {
        let node = this.gridClass.getNode(x, y);
        node.setType(NODE_TYPES.END);
        this.endNode = node;
    }

    getPath = (endNode) => {
        let path = [endNode];
        let curNode = endNode.parent;

        while (true) {
            path.unshift(curNode);

            if (curNode.type === NODE_TYPES.START) {
                return path;
            }

            curNode.setType(NODE_TYPES.PATH);
            curNode = curNode.parent;
        }
    }

    findPath = () => {
        console.log('Searching for path')
        let path = null;
        this.addToOpenList(this.startNode);

        while (this.openList.length > 0) {
            let curNode = this.openList.shift();

            if (curNode.isEnd) {
                path = this.getPath(curNode);
                break;
            }

            this.addToClosedList(curNode);

            let neighbors = this.gridClass.getNeighbors(curNode);

            for (let i = 0; i < neighbors.length; i++) {
                let adjNode = neighbors[i];

                if (adjNode.unwalkable || this.checkClosedList(adjNode)) {
                    continue;
                }

                let newAdjNodeGCost = curNode.gCost + this.calcCost(curNode, adjNode);
                let adjNotInOpenList = adjNode.gCost === null;

                if (newAdjNodeGCost < adjNode.gCost || adjNotInOpenList) {
                    let hCost = this.calcCost(adjNode, this.endNode);
                    adjNode.setGCost(newAdjNodeGCost);
                    adjNode.setHCost(hCost);
                    adjNode.setParent(curNode);

                    if (adjNotInOpenList) {
                        this.addToOpenList(adjNode);
                    }
                }
            }
        }

        this.gridClass.drawAllNodes();
        (path === null) ? console.log("Path doesn't exist") : console.log("Found path: ", path);;
        return (path === null) ? "Path doesn't exist" : path;
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

        if (openList.length === 0 || target < openList[0].getFCost()) return 0;

        if (target >= openList[openList.length - 1].getFCost()) return openList.length;

        let l = 0;
        let r = openList.length - 1;

        while (l <= r) {
            let midIdx = Math.ceil(l + (r - l) / 2);
            let cur = openList[midIdx].getFCost();
            let adj = openList[midIdx - 1].getFCost();

            if (cur > target && adj < target) {
                return midIdx;
            } else if (cur === target || adj === target) {
                midIdx = this.findIdxByHCost(midIdx, node);
                return midIdx;
            } else if (cur < target) {
                l = midIdx + 1;
            } else {
                r = midIdx - 1;
            }
        }
    }

    findIdxByHCost = (idx, node) => {
        let fCost = node.getFCost();
        let hCost = node.hCost;

        while (idx >= 0 && this.openList[idx].getFCost() === fCost) {
            idx--;
        }

        idx++;

        while (idx < this.openList.length && this.openList[idx].hCost < hCost && this.openList[idx].getFCost() === fCost) {
            idx++;
        }

        return idx;
    }

    addToOpenList = (node) => {
        let idx = this.findOpenListInsertIdx(node);
        this.openList.splice(idx, 0, node);
        if (node.type !== NODE_TYPES.START &&
            node.type !== NODE_TYPES.END) {
            node.setType(NODE_TYPES.OPEN_LIST)
        }
    }

    getKey = (x, y) => {
        return `x${x}y${y}`;
    }

    addToClosedList = (node) => {
        let key = this.getKey(node.x, node.y);
        this.closedList[key] = node;
        if (node.type !== NODE_TYPES.START &&
            node.type !== NODE_TYPES.END) {
            node.setType(NODE_TYPES.CLOSED_LIST)
        }
    }

    checkClosedList = (node) => {
        let key = this.getKey(node.x, node.y);
        return !!this.closedList[key];
    }
}

let grid = new Grid;
let aStar = new AStar(grid);

grid.drawAllNodes();

// canvas.addEventListener('click', () => aStar.findPath());
canvas.addEventListener('click', (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    console.log(node)
    aStar.findPath()
});
// canvas.addEventListener('click', (e) => grid.getNodeFromCoordinates(e.offsetX, e.offsetY));