import { RecBacktrNode, KruskalNode, EllerNode } from './nodes.js';

const MAZE_VIZ_TYPE = {
    PATH: "#FFFFFF",
    TRACEBACK: "#FF0000"
}

// Recursive Backtracking
export class RecursiveBacktracking {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];
        this.stepsTaken = [];

        this.cellSize = 2;
        this.numOfCells = Math.ceil(this.gridSizeX / this.cellSize) * Math.ceil(this.gridSizeY / this.cellSize);
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    getNeighborCells = (node) => {
        let neighbors = [];
        let cellSize = this.cellSize;
        let width = this.gridSizeX;
        let height = this.gridSizeY;

        let neighborPositions = [
            [cellSize, 0], // East
            [-cellSize, 0], // West
            [0, cellSize], // South
            [0, -cellSize] // North
        ]

        for (let i = 0; i < neighborPositions.length; i++) {
            let offsetX = neighborPositions[i][0];
            let offsetY = neighborPositions[i][1];

            let adjX = node.x + offsetX;
            let adjY = node.y + offsetY;

            if (
                adjX >= 0 && adjX < width &&
                adjY >= 0 && adjY < height
            ) {
                let neighbor = this.getNode(adjX, adjY);
                if (!neighbor.cellVisited) neighbors.push(neighbor);
            }

        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

    getStepsTaken = () => this.stepsTaken;

    generateMaze = () => {
        let cellsChecked = 0;
        let numOfCells = this.numOfCells;

        const getRandomCell = (arr) => {
            let min = 0;
            let max = arr.length - 1;
            let num = Math.floor(Math.random() * (max - min + 1)) + min;

            return arr[num];
        }

        let stack = [];
        let cur = this.getNode(0, 0);

        while (cellsChecked <= numOfCells) {
            let next;
            if (!cur.cellVisited) {
                cur.setCellVisited(true);
                stack.push(cur);
                cellsChecked++;
            }

            let neighbors = this.getNeighborCells(cur);
            cur.setNumOfNeighborCells(neighbors.length);

            if (!neighbors.length) {
                for (let i = stack.length - 1; i >= 0; i--) {
                    if (stack[i].numOfNeighborCells > 0) {
                        this.addToStepsTaken(stack[i], MAZE_VIZ_TYPE.TRACEBACK);
                        next = stack[i];
                        break;
                    }
                }
            } else {
                next = getRandomCell(neighbors);
            }

            if (next === undefined) break;

            this.setMazePathNode(cur, next);

            cur = next;
        }

        return this.grid;
    }

    init = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new RecBacktrNode(x, y);
            }
        }
    }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.init();
        return this.generateMaze();
    }

    setMazePathNode = (cur, next) => {
        let dirX = (next.x - cur.x) / this.cellSize;
        let dirY = (next.y - cur.y) / this.cellSize;

        let midNode = this.getNode(cur.x + dirX, cur.y + dirY);

        cur.setIsMazePath(true);
        midNode.setIsMazePath(true);

        this.addToStepsTaken(cur, MAZE_VIZ_TYPE.PATH);
        this.addToStepsTaken(midNode, MAZE_VIZ_TYPE.PATH);
    }
}

// Kruskal's Algorithm
export class Kruskal {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];
        this.stepsTaken = [];

        this.cellSize = 2;
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    getEdges = (cellsArr) => {
        let edges = [];
        let len = cellsArr.length;
        for (let i = 0; i < len; i++) {
            let cur = cellsArr[i];
            if (cur.x - 1 > 0) edges.push([cur.x - 1, cur.y, 'W']);
            if (cur.y - 1 > 0) edges.push([cur.x, cur.y - 1, 'N']);
        }
        return edges;
    }

    getNode = (x, y) => this.grid[x][y];

    getStepsTaken = () => this.stepsTaken;

    generateMaze = (edges) => {
        let len = edges.length;
        let DX = { "N": 0, "W": -1 };
        let DY = { "N": -1, "W": 0 };

        for (let i = 0; i < len; i++) {
            let [x, y, d] = edges[i];

            let edgeNode = this.getNode(x, y);

            let nodeA = this.getNode(x + DX[d], y + DY[d]);
            let nodeB = this.getNode(x + DX[d] * -1, y + DY[d] * -1);

            if (nodeA.getRoot() !== nodeB.getRoot()) {
                nodeA.connect(nodeB);

                nodeA.setIsMazePath(true);
                edgeNode.setIsMazePath(true);
                nodeB.setIsMazePath(true);

                this.addToStepsTaken(nodeA, MAZE_VIZ_TYPE.PATH);
                this.addToStepsTaken(edgeNode, MAZE_VIZ_TYPE.PATH);
                this.addToStepsTaken(nodeB, MAZE_VIZ_TYPE.PATH);
            }
        }

        return this.grid;
    }

    init = () => {
        let cellsArr = [];

        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                let node = new KruskalNode(x, y);
                this.grid[x][y] = node;
                if (x % 2 === 0 && y % 2 === 0) cellsArr.push(node);
            }
        }

        return cellsArr;
    }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        let cellsArr = this.init();
        let edges = this.getEdges(cellsArr);
        let shuffledEdges = this.shuffleArray(edges);
        return this.generateMaze(shuffledEdges);
    }

    shuffleArray(arr) {
        let m = arr.length, temp, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            temp = arr[m];
            arr[m] = arr[i];
            arr[i] = temp;
        }

        return arr;
    }
}

export class Eller {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];
        this.stepsTaken = [];

        this.cellSize = 2;
    }

    addStep = (node1, node2) => {
        let dx = (node2.x - node1.x) / this.cellSize;
        let dy = (node2.y - node1.y) / this.cellSize;
        let edgeNode = this.getNode(node1.x + dx, node1.y + dy);

        node1.setIsMazePath(true);
        edgeNode.setIsMazePath(true);
        node2.setIsMazePath(true);

        this.addToStepsTaken(node1, MAZE_VIZ_TYPE.PATH);
        this.addToStepsTaken(edgeNode, MAZE_VIZ_TYPE.PATH);
        this.addToStepsTaken(node2, MAZE_VIZ_TYPE.PATH);
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    getNode = (x, y) => this.grid[x][y];

    getStepsTaken = () => this.stepsTaken;

    generateMaze = () => {
        let sizeX = this.gridSizeX;
        let sizeY = this.gridSizeY;
        let cellSize = this.cellSize;

        let lastRow = false;

        for (let y = 0; y < sizeY; y += cellSize) {
            let hasAtLeastOneVerticalConnection = false;
            let nextRowTest = this.getNode(0, y + cellSize);
            if (nextRowTest === undefined) lastRow = true;

            for (let x = 0; x < sizeX; x += cellSize) {
                let nodeA = this.getNode(x, y);
                let nodeB = (x + cellSize >= sizeX) ? undefined : this.getNode(x + cellSize, y);

                if (lastRow) {
                    if (nodeB && nodeA.getRoot() !== nodeB.getRoot()) {
                        nodeB.connect(nodeA);
                        this.addStep(nodeA, nodeB);
                    }
                    continue;
                }

                let nodeC = this.getNode(x, y + cellSize);

                if (nodeB && nodeA.getRoot() !== nodeB.getRoot()) {
                    if (this.randBool()) {
                        nodeB.connect(nodeA);
                        this.addStep(nodeA, nodeB);
                        if (this.randBool()) {
                            nodeC.connect(nodeA);
                            hasAtLeastOneVerticalConnection = true;
                            this.addStep(nodeA, nodeC);
                        }
                    } else {
                        if (hasAtLeastOneVerticalConnection) {
                            if (this.randBool()) {
                                nodeC.connect(nodeA);
                                this.addStep(nodeA, nodeC);
                            }
                        } else {
                            nodeC.connect(nodeA);
                            this.addStep(nodeA, nodeC);
                        }
                        hasAtLeastOneVerticalConnection = false;
                    }
                } else {
                    if (this.randBool()) {
                        nodeC.connect(nodeA);
                        this.addStep(nodeA, nodeC);
                    }
                }
            }
        }

        return this.grid;
    }

    init = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new EllerNode(x, y);
            }
        }
    }

    randBool = () => !!(Math.random() > 0.5);

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.init();
        return this.generateMaze();
    }
}