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

}

class MinHeap {
    constructor(scoreFunction) {
        this.heap = [];
        this.scoreFunction = scoreFunction;
    }

    add = (el) => {
        this.heap.push(el);
        this.sortUp(this.heap.length - 1);
    }

    popMin = () => {
        let result = this.heap[0];
        let end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sortDown(0);
        }

        return result;
    }

    remove = (el) => {
        let length = this.heap.length;

        for (let i = 0; i < length; i++) {
            if (this.heap[i] != el) continue;

            let end = this.heap.pop();
            // If the element popped was the element to remove (i.e. el to remove was the last el in heap)
            if (i == length - 1) break;

            // Else replace the removed element with the popped and sort
            this.heap[i] = end;
            this.bubbleUp(i);
            this.sinkDown(i);
            break;
        }
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

            this.heap[parentIdx] = el;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }

    sortDown = (idx) => {
        let length = this.heap.length;
        let element = this.heap[idx];
        let elemScore = this.scoreFunction(element);

        while (true) {
            let child2Idx = (idx + 1) * 2;
            let child1Idx = child2Idx - 1;

            let swapIdx = null;

            if (child1Idx < length) {
                let child1 = this.heap[child1Idx]
                let child1Score = this.scoreFunction(child1);

                if (child1Score < elemScore)
                    swapIdx = child1Idx;
            }

            if (child2Idx < length) {
                let child2 = this.heap[child2Idx];
                let child2Score = this.scoreFunction(child2);
                if (child2Score < (swapIdx == null ? elemScore : child1Score))
                    swapIdx = child2Idx;
            }

            if (swapIdx == null) break;

            this.heap[idx] = this.heap[swapIdx];
            this.heap[swapIdx] = element;
            idx = swapIdx;
        }

    }

    scoreFunction = () => {

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

    drawNode = (x, y) => {
        let size = this.nodeSize;
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
        let node = this.getNode(x, y);
        return NODE_COLORS[node.type];
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

class AStar {
    constructor(grid) {
        this.gridClass = grid;
        this.grid = grid.grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = [];
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
                    }
                }
            }
        }

        this.gridClass.drawAllNodes();
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

    findOpenListInsertIdx = (node) => {
        let target = node.getFCost();
        let openList = this.openList;

        if (openList.length === 0 || target < openList[0].getFCost()) return 0;

        if (target >= openList[openList.length - 1].getFCost()) return openList.length;

        let l = 0;
        let r = openList.length - 1;
        let midIdx

        while (l <= r) {
            midIdx = Math.ceil(l + (r - l) / 2);
            let cur = openList[midIdx].getFCost();

            if (cur === target) {
                midIdx = this.findIdxByHCost(midIdx, node);
                return midIdx;
            } else if (cur < target) {
                l = midIdx + 1;
            } else {
                r = midIdx - 1;
            }
        }

        return midIdx;
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
            // node.setType(NODE_TYPES.OPEN_LIST)
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
            // node.setType(NODE_TYPES.CLOSED_LIST)
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

const addUnwalkable = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.UNWALKABLE);
        grid.drawNode(node.x, node.y);
    }
}

const addEmpty = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.UNWALKABLE || node.type === NODE_TYPES.SWAMP) {
        node.setType(NODE_TYPES.EMPTY);
        grid.drawNode(node.x, node.y);
    }
}

const addSwamp = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.SWAMP);
        grid.drawNode(node.x, node.y);
    }
}

const dragStart = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldStart = aStar.startNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldStart !== node) {
        oldStart.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldStart.x, oldStart.y);

        aStar.setStartNode(node.x, node.y);
        grid.drawNode(node.x, node.y);
    }
}

const dragEnd = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldEnd = aStar.endNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldEnd !== node) {
        oldEnd.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldEnd.x, oldEnd.y);

        aStar.setEndNode(node.x, node.y);
        grid.drawNode(node.x, node.y);
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
    }
});