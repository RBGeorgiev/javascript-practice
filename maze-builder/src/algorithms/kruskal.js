import { MAZE_VIZ_TYPE } from '../constants.js';

export default class Kruskal {
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