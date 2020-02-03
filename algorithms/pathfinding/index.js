let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.oncontextmenu = () => false;

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
        this.moveCost = 0;
        this.unwalkable = false;
        this.isEnd = false;
        this.parent = null;
        this.gCost = null;
        this.hCost = null;
        this.heapIdx = null;
    }

    getFCost = () => this.gCost + this.hCost;

    setGCost = (val) => this.gCost = val;

    setHCost = (val) => this.hCost = val;

    setParent = (parent) => this.parent = parent;

    setType = (type) => {
        this.type = type;
        this.moveCost = (type === NODE_TYPES.SWAMP) ? 5 : 0;
        this.unwalkable = !!(type === NODE_TYPES.UNWALKABLE);
        this.isEnd = !!(type === NODE_TYPES.END);
    }

    setHeapIdx = (idx) => this.heapIdx = idx;
}

class MinHeap {
    constructor(scoreFunction) {
        this.heap = [];
        this.scoreFunction = scoreFunction;
    }

    add = (el) => {
        this.heap.push(el);
        el.setHeapIdx(this.heap.length - 1);
        this.sortUp(this.heap.length - 1);
    }

    popMin = () => {
        let result = this.heap[0];
        let end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heap[0].setHeapIdx(0);
            this.sortDown(0);
        }

        return result;
    }

    remove = (idx) => {
        let end = this.heap.pop();
        if (idx == length - 1) return;

        this.heap[idx] = end;
        this.sortUp(i);
        this.sortDown(i);
    }

    update = (idx) => {
        this.sortUp(idx);
        this.sortDown(idx);
    }

    size = () => this.heap.length;

    sortUp = (idx) => {
        let el = this.heap[idx];
        let score = this.scoreFunction(el);

        while (idx > 0) {
            let parentIdx = Math.floor((idx + 1) / 2) - 1;
            let parent = this.heap[parentIdx];

            if (score >= this.scoreFunction(parent)) {
                break;
            }

            this.swap(idx, parentIdx);
            idx = parentIdx;
        }
    }

    sortDown = (idx) => {
        let length = this.heap.length;
        let element = this.heap[idx];
        let elemScore = this.scoreFunction(element);

        let child1, child1Score, child1Idx,
            child2, child2Score, child2Idx,
            swapIdx;

        while (true) {
            child2Idx = (idx + 1) * 2;
            child1Idx = child2Idx - 1;

            swapIdx = null;

            if (child1Idx < length) {
                child1 = this.heap[child1Idx]
                child1Score = this.scoreFunction(child1);

                if (child1Score < elemScore)
                    swapIdx = child1Idx;
            }

            if (child2Idx < length) {
                child2 = this.heap[child2Idx];
                child2Score = this.scoreFunction(child2);
                if (child2Score < (swapIdx == null ? elemScore : child1Score))
                    swapIdx = child2Idx;
            }

            if (swapIdx == null) break;

            this.swap(idx, swapIdx);
            idx = swapIdx;
        }
    }

    swap = (idx1, idx2) => {
        let el1 = this.heap[idx1];
        let el2 = this.heap[idx2];

        el1.setHeapIdx(idx2);
        this.heap[idx1] = el2;

        el2.setHeapIdx(idx1);
        this.heap[idx2] = el1;
    }

}

class Grid {
    constructor() {
        this.gridSizeX = 50;
        this.gridSizeY = this.gridSizeX / 2;
        this.nodeSize = canvas.width / this.gridSizeX;
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

    getNodeFromCoordinates = (x, y) => {
        let gridX = Math.floor(x / this.nodeSize);
        let gridY = Math.floor(y / this.nodeSize);

        if (gridX < 0 || gridX >= this.gridSizeX ||
            gridY < 0 || gridY >= this.gridSizeY) {
            return null;
        }

        return this.getNode(gridX, gridY);
    }
}

class GridVisualization {
    constructor(grid) {
        this.gridClass = grid;
        this.grid = grid.grid;
    }

    drawNode = (x, y) => {
        let size = this.gridClass.nodeSize;
        let xPos = size * x;
        let yPos = size * y;
        let color = this.getNodeColor(x, y);

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";
        ctx.rect(xPos, yPos, size, size);
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                this.drawNode(x, y);
            }
        }
    }

    getNodeColor = (x, y) => {
        let node = this.gridClass.getNode(x, y);
        return NODE_COLORS[node.type];
    }

}

class AStar {
    constructor(grid) {
        this.gridClass = grid;
        this.grid = grid.grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = new MinHeap(this.scoreFunction);
        this.closedList = {};

        this.setStartNode(10, 8);
        this.setEndNode(23, 8);
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

    isDiagonalBlocked = (curNode, adjNode) => {
        let sideNodeX = this.gridClass.getNode(adjNode.x, curNode.y);
        let sideNodeY = this.gridClass.getNode(curNode.x, adjNode.y);

        return !!(sideNodeX.unwalkable && sideNodeY.unwalkable);
    }

    findPath = () => {
        console.log('Searching for path')
        let path = null;
        this.addToOpenList(this.startNode);

        while (this.openList.size() > 0) {
            let curNode = this.openList.popMin();

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

                if (curNode.x - adjNode.x !== 0 && curNode.y - adjNode.y !== 0) {
                    let blocked = this.isDiagonalBlocked(curNode, adjNode);
                    if (blocked) continue;
                }

                let newAdjNodeGCost = curNode.gCost + this.calcCost(curNode, adjNode) + adjNode.moveCost;
                let adjNotInOpenList = !!(adjNode.gCost === null);

                if (newAdjNodeGCost < adjNode.gCost || adjNotInOpenList) {
                    let hCost = this.calcCost(adjNode, this.endNode);
                    adjNode.setGCost(newAdjNodeGCost);
                    adjNode.setHCost(hCost);
                    adjNode.setParent(curNode);

                    if (adjNotInOpenList) {
                        this.addToOpenList(adjNode);
                    } else {
                        this.openList.update(adjNode.heapIdx);
                    }
                }
            }
        }

        (path === null) ? console.log("Path doesn't exist") : console.log("Found path: ", path);
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

    scoreFunction = (node) => node.getFCost();

    addToOpenList = (node) => this.openList.add(node);

    getKey = (x, y) => `x${x}y${y}`;

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
let gridVis = new GridVisualization(grid);
let aStar = new AStar(grid);

gridVis.drawAllNodes();

const addUnwalkable = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.UNWALKABLE);
        gridVis.drawNode(node.x, node.y);
    }
}

const addEmpty = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.UNWALKABLE || node.type === NODE_TYPES.SWAMP) {
        node.setType(NODE_TYPES.EMPTY);
        gridVis.drawNode(node.x, node.y);
    }
}

const addSwamp = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.SWAMP);
        gridVis.drawNode(node.x, node.y);
    }
}

const dragStart = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldStart = aStar.startNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldStart !== node) {
        oldStart.setType(NODE_TYPES.EMPTY);
        gridVis.drawNode(oldStart.x, oldStart.y);

        aStar.setStartNode(node.x, node.y);
        gridVis.drawNode(node.x, node.y);
    }
}

const dragEnd = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldEnd = aStar.endNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldEnd !== node) {
        oldEnd.setType(NODE_TYPES.EMPTY);
        gridVis.drawNode(oldEnd.x, oldEnd.y);

        aStar.setEndNode(node.x, node.y);
        gridVis.drawNode(node.x, node.y);
    }
}

const handleMouseDown = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let listener;

    switch (node.type) {
        case NODE_TYPES.EMPTY:
            if (e.buttons === 1) {
                listener = addUnwalkable;
                canvas.addEventListener('mousemove', addUnwalkable);
            } else if (e.buttons === 2) {
                listener = addSwamp;
                canvas.addEventListener('mousemove', addSwamp);
            }
            break;

        case NODE_TYPES.UNWALKABLE:
            listener = addEmpty;
            canvas.addEventListener('mousemove', addEmpty);
            break;

        case NODE_TYPES.START:
            listener = dragStart;
            canvas.addEventListener('mousemove', dragStart);
            break;

        case NODE_TYPES.END:
            listener = dragEnd;
            canvas.addEventListener('mousemove', dragEnd);
            break;

        default:
            listener = addEmpty;
            canvas.addEventListener('mousemove', addEmpty);
    }

    canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', listener));
}

canvas.addEventListener('mousedown', (e) => handleMouseDown(e));

document.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
        aStar.findPath();
        gridVis.drawAllNodes();
    }
});