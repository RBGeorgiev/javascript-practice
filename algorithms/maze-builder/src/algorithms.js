import { RecBacktrNode, KruskalNode, EllerNode } from './nodes.js';

const MAZE_VIZ_TYPE = {
    PATH: "#FFFFFF",
    TRACEBACK: "#FF0000"
}

// Recursive Backtracking
export class RecursiveBacktracking {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
        this.numOfCells;
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    getNode = (x, y) => this.grid[x][y];

    getNumOfHexCells = (sizeX = this.gridClass.gridSizeX, sizeY = this.grid[0].length) => Math.round(sizeX / 4) * Math.ceil(sizeY / 2) + Math.round((sizeX - 2) / 4) * Math.floor(sizeY / 2);

    getNumOfSquareCells = (sizeX = this.gridClass.gridSizeX, sizeY = this.grid[0].length) => Math.ceil(sizeX / 2) * Math.ceil(sizeY / 2);

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

            let neighbors = this.gridClass.getNeighborCells(cur, (neighbor) => neighbor.cellVisited);
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

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.grid = this.gridClass.initGrid(RecBacktrNode);
        this.numOfCells = (this.grid[0][0].isHex) ? this.getNumOfHexCells() : this.getNumOfSquareCells();
        return this.generateMaze();
    }

    setMazePathNode = (cur, next) => {
        let midNode = this.gridClass.getMidNode(cur, next);

        cur.setIsMazePath(true);
        midNode.setIsMazePath(true);

        this.addToStepsTaken(cur, MAZE_VIZ_TYPE.PATH);
        this.addToStepsTaken(midNode, MAZE_VIZ_TYPE.PATH);
    }
}

// Kruskal's Algorithm
export class Kruskal {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    // for hex grid
    getHexEdges = (cellsArr) => {
        let edges = [];
        let len = cellsArr.length;
        for (let i = 0; i < len; i++) {
            let cur = cellsArr[i];
            edges.push([cur.x, cur.y - 1]);
            edges.push([cur.x - 1, cur.y]);
            edges.push([cur.x - 1, cur.y + 1]);
        }
        return edges;
    }

    // for square grid
    getSquareEdges = (cellsArr) => {
        let edges = [];
        let len = cellsArr.length;
        for (let i = 0; i < len; i++) {
            let cur = cellsArr[i];
            if (cur.y - 1 > 0) edges.push([cur.x, cur.y - 1, 'N']);
            if (cur.x - 1 > 0) edges.push([cur.x - 1, cur.y, 'W']);
        }
        return edges;
    }

    getNode = (x, y) => this.grid[x][y];

    getStepsTaken = () => this.stepsTaken;

    // for hex grid
    generateHexMaze = (edges) => {
        let len = edges.length;

        for (let i = 0; i < len; i++) {
            let [x, y] = edges[i];

            if (x <= 0 || y <= 0 || y + 1 >= this.grid[x].length) continue;
            let edgeNode = this.getNode(x, y);

            let adjNodes = this.gridClass.getNeighbors(edgeNode, (neighbor) => !neighbor.isKruskalCell);
            let nodeA = adjNodes[0];
            let nodeB = adjNodes[1];

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

    // for square grid
    generateSquareMaze = (edges) => {
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

    // for hex grid
    getHexCellsArr = () => {
        let cellsArr = [];

        let width = this.grid.length;

        for (let x = 0; x < width; x += 2) {
            let height = this.grid[x].length;
            for (let y = 0; y < height; y++) {
                if (x % 4 === 0 && y % 2 === 0 || (x - 2) % 4 === 0 && y % 2 === 1) {
                    let node = this.getNode(x, y);
                    node.setIsKruskalCell(true);
                    cellsArr.push(node);
                }
            }
        }

        return cellsArr;
    }

    // for square grid
    getSquareCellsArr = () => {
        let cellsArr = [];

        let width = this.grid.length;

        for (let x = 0; x < width; x += 2) {
            let height = this.grid[x].length;
            for (let y = 0; y < height; y++) {
                if (x % 2 === 0 && y % 2 === 0) {
                    let node = this.getNode(x, y);
                    // node.setIsKruskalCell(true);
                    cellsArr.push(node);
                }
            }
        }

        return cellsArr;
    }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.grid = this.gridClass.initGrid(KruskalNode);
        let isHexGrid = !!this.grid[0][0].isHex;
        let cellsArr = (isHexGrid) ? this.getHexCellsArr() : this.getSquareCellsArr();
        let edges = (isHexGrid) ? this.getHexEdges(cellsArr) : this.getSquareEdges(cellsArr);
        let shuffledEdges = this.shuffleArray(edges);
        return (isHexGrid) ? this.generateHexMaze(shuffledEdges) : this.generateSquareMaze(shuffledEdges);
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

// Eller's Algorithm
export class Eller {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    addStep = (node1, node2) => {
        let dx = (node2.x - node1.x) / 2;
        let dy = (node2.y - node1.y) / 2;
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
        let sizeX = this.grid.length;
        let sizeY = this.grid[0].length;
        let cellSize = 2;

        let lastRow = false;

        for (let y = 0; y < sizeY; y += cellSize) {
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
                    }
                }

                if (nodeA.getRoot() === nodeA) {
                    nodeC.connect(nodeA);
                    this.addStep(nodeA, nodeC);
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

    randBool = () => !!(Math.random() > 0.5);

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.grid = this.gridClass.initGrid(EllerNode);
        return this.generateMaze();
    }
}