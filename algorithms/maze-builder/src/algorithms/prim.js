// import { PrimNode } from '../nodes.js';
// import { MAZE_VIZ_TYPE } from '../constants.js';

export default class Prim {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    // addStep = (node1, node2) => {
    //     let dx = (node2.x - node1.x) / 2;
    //     let dy = (node2.y - node1.y) / 2;
    //     let edgeNode = this.getNode(node1.x + dx, node1.y + dy);

    //     node1.setIsMazePath(true);
    //     edgeNode.setIsMazePath(true);
    //     node2.setIsMazePath(true);

    //     this.addToStepsTaken(node1, MAZE_VIZ_TYPE.PATH);
    //     this.addToStepsTaken(edgeNode, MAZE_VIZ_TYPE.PATH);
    //     this.addToStepsTaken(node2, MAZE_VIZ_TYPE.PATH);
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
    //     let sizeX = this.grid.length;
    //     let sizeY = this.grid[0].length;
    //     let cellSize = 2;

    //     return this.grid;
    // }


    resetStepsTaken = () => this.stepsTaken = [];

    // run = () => {
    //     this.resetStepsTaken();
    //     this.grid = this.gridClass.initGrid(PrimNode);
    //     return this.generateMaze();
    // }
}