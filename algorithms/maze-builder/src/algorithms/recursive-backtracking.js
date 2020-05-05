import { RecBacktrNode } from '../nodes.js';
import { MAZE_VIZ_TYPE } from '../constants.js';

export default class RecursiveBacktracking {
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