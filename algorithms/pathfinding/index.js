import MazeBuilder from '../maze-builder/index.js';

// ___________________________________________________________________

let animSpeedInput = document.getElementById('animSpeedInput');
let animSpeedSpan = document.getElementById('animSpeedSpan');
let clearWallsBtn = document.getElementById('clearWallsBtn');
let algorithmSelect = document.getElementById('algorithmSelect');
let runAlgorithmBtn = document.getElementById('runAlgorithmBtn');
let createMazeBtn = document.getElementById('createMazeBtn');

// ___________________________________________________________________

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.oncontextmenu = () => false;

canvas.width = 1600;
canvas.height = 800;

// #region eNums
const NODE_COLORS = {
    EMPTY: "#FFFFFF",
    UNWALKABLE: "#000000",
    SWAMP: "#CCC769",
    START: "#00FF00",
    END: "#FF0000"
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

const ASTAR_TYPES = {
    PATH: "PATH",
    OPEN_LIST: "OPEN_LIST",
    CLOSED_LIST: "CLOSED_LIST"
}
Object.freeze(ASTAR_TYPES);

const ASTAR_COLORS = {
    PATH: "#FFA500",
    OPEN_LIST: "#00CDCD",
    CLOSED_LIST: "#0000FF"
    // PATH: "rgba(247, 153, 58, 0.82)",
    // OPEN_LIST: "rgba(63, 191, 191, 0.42)",
    // CLOSED_LIST: "rgba(63, 127, 191, 0.57)"
}
Object.freeze(ASTAR_COLORS);
// #endregion eNums


class Node {
    constructor(x, y, type = NODE_TYPES.EMPTY) {
        this.x = x;
        this.y = y;
        this.parent = null;
        this.heapIdx = null;
        this.type = type;
        this.moveCost = 0;
        this.unwalkable = false;
        this.isEnd = false;
        this.setType(type);
    }

    setHeapIdx = (idx) => this.heapIdx = idx;

    setParent = (parent) => this.parent = parent;

    setType = (type) => {
        this.type = type;
        this.moveCost = (type === NODE_TYPES.SWAMP) ? 5 : 0;
        this.unwalkable = !!(type === NODE_TYPES.UNWALKABLE);
        this.isEnd = !!(type === NODE_TYPES.END);
    }
}

class AStarNode extends Node {
    constructor(x, y, type) {
        super(x, y, type);
        this.gCost = null;
        this.hCost = null;
        this.closed = false;
    }

    getFCost = () => this.gCost + this.hCost;

    resetPathfindingValues = () => {
        this.setGCost(null);
        this.setHCost(null);
        this.setParent(null);
        this.setHeapIdx(null);
        this.setClosed(false);
    }

    setClosed = (bool = true) => this.closed = bool;

    setGCost = (val) => this.gCost = val;

    setHCost = (val) => this.hCost = val;
}

class DijkstraNode extends Node {
    constructor(x, y, type) {
        super(x, y, type);
        this.dist = Infinity;
        this.visited = false;
    }

    getDist = () => this.dist;

    resetPathfindingValues = () => {
        this.setDist(Infinity);
        this.setParent(null);
        this.setHeapIdx(null);
        this.setVisited(false);
    }

    setDist = (val) => this.dist = val;

    setVisited = (bool) => this.visited = bool;
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

    reset = () => this.heap = [];

    size = () => this.heap.length;

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

    sortUp = (idx) => {
        let el = this.heap[idx];
        let score = this.scoreFunction(el);

        while (idx > 0) {
            let parentIdx = Math.floor((idx + 1) / 2) - 1;
            let parent = this.heap[parentIdx];

            if (score > this.scoreFunction(parent)) {
                break;
            }

            this.swap(idx, parentIdx);
            idx = parentIdx;
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

    update = (idx) => {
        this.sortUp(idx);
        this.sortDown(idx);
    }
}

class Grid {
    constructor(sizeX = 50, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                let node = this.getNode(x, y);
                this.drawNode(node);
            }
        }
    }

    drawNode = (node) => {
        let size = this.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;
        let color = this.getNodeColor(node);

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";
        ctx.rect(xPos, yPos, size, size);
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    }

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

    getNode = (x, y) => this.grid[x][y];

    getNodeColor = (node) => NODE_COLORS[node.type];

    getNodeFromCoordinates = (x, y) => {
        let gridX = Math.floor(x / this.nodeSize);
        let gridY = Math.floor(y / this.nodeSize);

        if (gridX < 0 || gridX >= this.gridSizeX ||
            gridY < 0 || gridY >= this.gridSizeY) {
            return null;
        }

        return this.getNode(gridX, gridY);
    }

    initGrid = (pathfindingNode) => {
        this.grid = [];
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new pathfindingNode(x, y);
            }
        }
    }

    transferGridState = (pathfindingNode) => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                let oldNode = this.getNode(x, y);
                let type = oldNode.type;
                this.grid[x][y] = new pathfindingNode(x, y, type);
            }
        }
    }

    transferMazeToGrid = (maze, pathfindingNode) => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                // let oldNode = this.getNode(x, y);
                let type = (maze[x][y].isMazePath) ? NODE_TYPES.EMPTY : NODE_TYPES.UNWALKABLE;
                // let type = oldNode.type;
                this.grid[x][y] = new pathfindingNode(x, y, type);
            }
        }
    }
}

class AStar {
    constructor(grid) {
        this.gridClass = grid;
        this.algorithmNode = AStarNode;
        this.gridClass.transferGridState(this.algorithmNode);
        this.grid = grid.grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = new MinHeap(this.scoreFunction);
        this.complete = false;

        this.stepsTaken = [];

        this.animSpeed = +animSpeedInput.value;
    }

    addToClosedList = (node) => {
        node.setClosed(true);
        this.addToStepsTaken(node, ASTAR_TYPES.CLOSED_LIST);
    }

    addToOpenList = (node) => {
        this.openList.add(node);
        this.addToStepsTaken(node, ASTAR_TYPES.OPEN_LIST);
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    animateSteps = () => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = this.stepsTaken.length;

        let timeout, j, speed;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i + 1 >= len) return;

            speed = this.animSpeed;

            timeout = deltaTime / speed;
            j = 0;

            while (j < speed) {
                setTimeout(this.visualizeStep(i + j), timeout * j)
                j++;
            }

            i += speed;

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    calcCost = (nodeA, nodeB) => {
        let distX = Math.abs(nodeA.x - nodeB.x);
        let distY = Math.abs(nodeA.y - nodeB.y);

        if (distX > distY) {
            return 14 * distY + 10 * (distX - distY);
        }
        return 14 * distX + 10 * (distY - distX);
    }

    drawPath = (nodeA, nodeB) => {
        let size = this.gridClass.nodeSize;
        let aX = size * nodeA.x + size / 2;
        let aY = size * nodeA.y + size / 2;
        let bX = size * nodeB.x + size / 2;
        let bY = size * nodeB.y + size / 2;

        ctx.strokeStyle = ASTAR_COLORS.PATH;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
    }

    drawPathfindingNode = (node, color) => {
        if (Object.is(node, this.startNode) || node.isEnd) return;
        let size = this.gridClass.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;

        ctx.beginPath();

        ctx.fillStyle = color;

        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        if (color === ASTAR_COLORS.CLOSED_LIST || color === ASTAR_COLORS.PATH) {
            ctx.arc(xPos + size / 2, yPos + size / 2, size / 3, 0, 2 * Math.PI);
        } else {
            ctx.rect(xPos + size / 4, yPos + size / 4, size / 2, size / 2);
        }

        ctx.fill();
        ctx.stroke();
    }

    drawSteps = () => {
        let len = this.stepsTaken.length;
        for (let i = 0; i < len; i++) {
            this.visualizeStep(i);
        }
    }

    findPath = () => {
        console.time('A*');
        let path = null;
        this.addToOpenList(this.startNode);

        while (this.openList.size() > 0) {
            let curNode = this.openList.popMin();

            this.addToClosedList(curNode);

            let neighbors = this.gridClass.getNeighbors(curNode);

            for (let i = 0; i < neighbors.length; i++) {
                let adjNode = neighbors[i];

                if (adjNode.unwalkable || adjNode.closed) {
                    continue;
                }

                if (curNode.x - adjNode.x !== 0 && curNode.y - adjNode.y !== 0) {
                    let blocked = this.isDiagonalBlocked(curNode, adjNode);
                    if (blocked) continue;
                }

                if (adjNode.isEnd) {
                    adjNode.setParent(curNode);
                    path = this.getPath(adjNode);
                    console.timeEnd('A*');
                    return path;
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

        console.timeEnd('A*');
        return console.log("Path doesn't exist");
    }

    getPath = (endNode) => {
        let path = [];
        let curNode = endNode;

        while (true) {
            path.unshift(curNode);

            this.addToStepsTaken(curNode, ASTAR_TYPES.PATH);

            if (curNode.type === NODE_TYPES.START) {
                return path;
            }

            curNode = curNode.parent;
        }
    }

    isDiagonalBlocked = (curNode, adjNode) => {
        let sideNodeX = this.gridClass.getNode(adjNode.x, curNode.y);
        let sideNodeY = this.gridClass.getNode(curNode.x, adjNode.y);

        return !!(sideNodeX.unwalkable && sideNodeY.unwalkable);
    }

    placeStartAndEndInMaze = () => {
        let [startX, startY] = [this.startNode.x, this.startNode.y];
        let [endX, endY] = [this.endNode.x, this.endNode.y];

        let newStartNode = this.gridClass.getNode(startX, startY);
        if (newStartNode.type === NODE_TYPES.EMPTY) {
            this.setStartNode(newStartNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newStartNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setStartNode(adj);
                    break;
                }
            }
        }

        let newEndNode = this.gridClass.getNode(endX, endY);
        if (newEndNode.type === NODE_TYPES.EMPTY) {
            this.setEndNode(newEndNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newEndNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setEndNode(adj);
                    break;
                }
            }
        }
    }

    reset = () => {
        let gridWidth = this.gridClass.gridSizeX;
        let gridHeight = this.gridClass.gridSizeY;

        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                let node = this.gridClass.getNode(x, y);
                if (node.gCost === null) continue;
                this.gridClass.drawNode(node);
                node.resetPathfindingValues();
            }
        }
        this.gridClass.drawNode(this.startNode);
        this.gridClass.drawNode(this.endNode);

        this.openList.reset();

        this.stepsTaken = [];
    }

    run = () => {
        this.reset();
        this.findPath();
        this.visualizationController();
        this.setComplete(true);
    }

    scoreFunction = (node) => node.getFCost();

    setComplete = (bool) => this.complete = bool;

    setEndNode = (node) => {
        node.setType(NODE_TYPES.END);
        this.endNode = node;
    }

    setStartNode = (node) => {
        node.setType(NODE_TYPES.START);
        this.startNode = node;
    }

    visualizationController = () => (this.complete) ? this.drawSteps() : this.animateSteps();

    visualizeStep = (i) => {
        if (i + 1 >= this.stepsTaken.length) return;

        let curNode = this.stepsTaken[i].node;
        let curType = this.stepsTaken[i].type;

        if (curType === ASTAR_TYPES.PATH) {
            let nextNode = this.stepsTaken[i + 1].node;
            this.drawPath(curNode, nextNode);
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
        else {
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
    }
}

class Dijkstra {
    constructor() {
        this.gridClass = grid;
        this.algorithmNode = DijkstraNode;
        this.gridClass.transferGridState(this.algorithmNode);
        this.grid = grid.grid;
        this.startNode = null;
        this.endNode = null;
        this.unvisitedList = new MinHeap(this.scoreFunction);
        this.complete = false;

        this.stepsTaken = [];

        this.animSpeed = +animSpeedInput.value;
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    animateSteps = () => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = this.stepsTaken.length;

        let timeout, j, speed;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i + 1 >= len) return;

            speed = this.animSpeed;

            timeout = deltaTime / speed;
            j = 0;

            while (j < speed) {
                setTimeout(this.visualizeStep(i + j), timeout * j)
                j++;
            }

            i += speed;

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    drawPath = (nodeA, nodeB) => {
        let size = this.gridClass.nodeSize;
        let aX = size * nodeA.x + size / 2;
        let aY = size * nodeA.y + size / 2;
        let bX = size * nodeB.x + size / 2;
        let bY = size * nodeB.y + size / 2;

        ctx.strokeStyle = ASTAR_COLORS.PATH;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
    }

    drawPathfindingNode = (node, color) => {
        if (Object.is(node, this.startNode) || node.isEnd) return;
        let size = this.gridClass.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;

        ctx.beginPath();

        ctx.fillStyle = color;

        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        if (color === ASTAR_COLORS.CLOSED_LIST || color === ASTAR_COLORS.PATH) {
            ctx.arc(xPos + size / 2, yPos + size / 2, size / 3, 0, 2 * Math.PI);
        } else {
            ctx.rect(xPos + size / 4, yPos + size / 4, size / 2, size / 2);
        }

        ctx.fill();
        ctx.stroke();
    }

    drawSteps = () => {
        let len = this.stepsTaken.length;
        for (let i = 0; i < len; i++) {
            this.visualizeStep(i);
        }
    }

    findPath = () => {
        console.time('Dijkstra');
        for (let x = 0; x < this.gridClass.gridSizeX; x++) {
            for (let y = 0; y < this.gridClass.gridSizeY; y++) {
                let node = this.gridClass.getNode(x, y);
                this.unvisitedList.add(node);
            }
        }

        let curNode;
        while (true) {
            curNode = this.unvisitedList.popMin();

            if (curNode.dist === Infinity) {
                console.timeEnd('Dijkstra');
                return console.log("Path doesn't exist");
            }

            let neighbors = this.gridClass.getNeighbors(curNode);
            for (let adjNode of neighbors) {
                if (adjNode.visited || adjNode.unwalkable) continue;

                let newDist;

                if (adjNode.x - curNode.x !== 0 && adjNode.y - curNode.y !== 0) {
                    let blocked = this.isDiagonalBlocked(curNode, adjNode);
                    if (blocked) continue;
                    newDist = curNode.dist + 14 + adjNode.moveCost;
                } else {
                    newDist = curNode.dist + 10 + adjNode.moveCost;
                }

                if (newDist < adjNode.dist) {
                    adjNode.setDist(newDist);
                    adjNode.setParent(curNode);
                    this.unvisitedList.update(adjNode.heapIdx);
                    this.addToStepsTaken(adjNode, ASTAR_TYPES.OPEN_LIST);
                }
            }

            curNode.setVisited(true);
            this.addToStepsTaken(curNode, ASTAR_TYPES.CLOSED_LIST);
            if (curNode.isEnd) {
                let path = this.getPath(curNode);
                console.timeEnd('Dijkstra');
                return path;
            }
        }

    }

    getPath = (endNode) => {
        let path = [];
        let curNode = endNode;

        while (true) {
            path.unshift(curNode);

            this.addToStepsTaken(curNode, ASTAR_TYPES.PATH);

            if (curNode.type === NODE_TYPES.START) {
                return path;
            }

            curNode = curNode.parent;
        }
    }

    isDiagonalBlocked = (curNode, adjNode) => {
        let sideNodeX = this.gridClass.getNode(adjNode.x, curNode.y);
        let sideNodeY = this.gridClass.getNode(curNode.x, adjNode.y);

        return !!(sideNodeX.unwalkable && sideNodeY.unwalkable);
    }

    placeStartAndEndInMaze = () => {
        let [startX, startY] = [this.startNode.x, this.startNode.y];
        let [endX, endY] = [this.endNode.x, this.endNode.y];

        let newStartNode = this.gridClass.getNode(startX, startY);
        if (newStartNode.type === NODE_TYPES.EMPTY) {
            this.setStartNode(newStartNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newStartNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setStartNode(adj);
                    break;
                }
            }
        }

        let newEndNode = this.gridClass.getNode(endX, endY);
        if (newEndNode.type === NODE_TYPES.EMPTY) {
            this.setEndNode(newEndNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newEndNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setEndNode(adj);
                    break;
                }
            }
        }
    }

    reset = () => {
        let gridWidth = this.gridClass.gridSizeX;
        let gridHeight = this.gridClass.gridSizeY;

        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                let node = this.gridClass.getNode(x, y);
                if (node.dist === Infinity) continue;
                this.gridClass.drawNode(node);
                node.resetPathfindingValues();
            }
        }
        this.startNode.setDist(0);
        this.gridClass.drawNode(this.startNode);
        this.gridClass.drawNode(this.endNode);

        this.unvisitedList.reset();

        this.stepsTaken = [];
    }

    run = () => {
        this.reset();
        this.findPath();
        this.visualizationController();
        this.setComplete(true);
    }

    scoreFunction = (node) => node.getDist();

    setComplete = (bool) => this.complete = bool;

    setEndNode = (node) => {
        node.setType(NODE_TYPES.END);
        this.endNode = node;
    }

    setStartNode = (node) => {
        node.setType(NODE_TYPES.START);
        node.setDist(0);
        this.startNode = node;
    }

    visualizationController = () => (this.complete) ? this.drawSteps() : this.animateSteps();

    visualizeStep = (i) => {
        if (i + 1 >= this.stepsTaken.length) return;

        let curNode = this.stepsTaken[i].node;
        let curType = this.stepsTaken[i].type;

        if (curType === ASTAR_TYPES.PATH) {
            let nextNode = this.stepsTaken[i + 1].node;
            this.drawPath(curNode, nextNode);
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
        else {
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
    }
}

let grid = new Grid;
grid.initGrid(AStarNode);
let currentAlgorithm = new AStar(grid);
currentAlgorithm.setStartNode(grid.getNode(10, 8));
currentAlgorithm.setEndNode(grid.getNode(23, 8));

grid.drawAllNodes();


const changeAlgorithm = (algorithm) => {
    let start = currentAlgorithm.startNode;
    let end = currentAlgorithm.endNode;

    currentAlgorithm = new algorithm(grid);

    currentAlgorithm.setStartNode(grid.getNode(start.x, start.y));
    currentAlgorithm.setEndNode(grid.getNode(end.x, end.y));

    grid.drawAllNodes();
}

const addUnwalkable = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.UNWALKABLE);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            currentAlgorithm.run();
        }
    }
}

const addEmpty = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.UNWALKABLE || node.type === NODE_TYPES.SWAMP) {
        node.setType(NODE_TYPES.EMPTY);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            currentAlgorithm.run();
        }
    }
}

const addSwamp = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.SWAMP);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            currentAlgorithm.run();
        }
    }
}

const dragStart = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldStart = currentAlgorithm.startNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldStart !== node) {
        oldStart.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldStart);

        currentAlgorithm.setStartNode(node);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            oldStart.resetPathfindingValues();
            currentAlgorithm.run();
        }
    }
}

const dragEnd = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldEnd = currentAlgorithm.endNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldEnd !== node) {
        oldEnd.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldEnd);

        currentAlgorithm.setEndNode(node);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            oldEnd.resetPathfindingValues();
            currentAlgorithm.run();
        }
    }
}

const handleMouseDown = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let listener;

    switch (node.type) {
        case NODE_TYPES.EMPTY:
            if (e.buttons === 1) {
                listener = addUnwalkable;
                addUnwalkable(e);
                canvas.addEventListener('mousemove', addUnwalkable);
            } else if (e.buttons === 2) {
                listener = addSwamp;
                addSwamp(e);
                canvas.addEventListener('mousemove', addSwamp);
            }
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
            addEmpty(e);
            canvas.addEventListener('mousemove', addEmpty);
    }

    canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', listener));
}

canvas.addEventListener('mousedown', (e) => handleMouseDown(e));

document.addEventListener('keydown', (e) => {
    // Space and Enter
    if (e.keyCode === 13 || e.keyCode === 32) {
        currentAlgorithm.setComplete(false);
        currentAlgorithm.run();
    }
});


// ___________________________________________________
// Options

runAlgorithmBtn.onclick = () => {
    runAlgorithmBtn.blur();
    currentAlgorithm.setComplete(false);
    currentAlgorithm.run();
}

algorithmSelect.onchange = () => {
    algorithmSelect.blur();
    switch (algorithmSelect.value) {
        case 'AStar':
            changeAlgorithm(AStar);
            break;
        case 'Dijkstra':
            changeAlgorithm(Dijkstra);
            break;
        default:
            console.error('Error determining algorithm');
    }
}

animSpeedInput.oninput = (e) => {
    animSpeedInput.blur();
    let val = +e.target.value;
    currentAlgorithm.animSpeed = val;
    animSpeedSpan.innerHTML = val;
}

clearWallsBtn.onclick = () => {
    clearWallsBtn.blur();
    let start = currentAlgorithm.startNode;
    let end = currentAlgorithm.endNode;

    grid.initGrid(currentAlgorithm.algorithmNode);

    currentAlgorithm.setStartNode(grid.getNode(start.x, start.y));
    currentAlgorithm.setEndNode(grid.getNode(end.x, end.y));
    currentAlgorithm.setComplete(false);

    grid.drawAllNodes();
}

createMazeBtn.onclick = () => {
    createMazeBtn.blur();
    let mazeBuilder = new MazeBuilder(grid.gridSizeX, grid.gridSizeY);
    let maze = mazeBuilder.run();
    grid.transferMazeToGrid(maze, currentAlgorithm.algorithmNode);
    currentAlgorithm.placeStartAndEndInMaze();
    currentAlgorithm.setComplete(false);

    grid.drawAllNodes();
}