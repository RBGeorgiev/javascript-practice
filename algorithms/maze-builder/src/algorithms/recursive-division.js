import { RecDivNode } from '../nodes.js';
import { MAZE_VIZ_TYPE } from '../constants.js';

export default class RecursiveDivision {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    // addStep = (node1, node2) => {

    // }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    getNode = (x, y) => this.grid[x][y];

    getStepsTaken = () => this.stepsTaken;

    // generateMaze = () => {
    //     return this.grid;
    // }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.grid = this.gridClass.initGrid(RecDivNode);
        return this.generateMaze();
    }
}