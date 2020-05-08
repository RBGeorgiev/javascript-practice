import { PrimNode } from '../nodes.js';
import { MAZE_VIZ_TYPE } from '../constants.js';

export default class Prim {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    addStep = (node1, node2) => {
        node1.setIsMazePath(true);
        this.addToStepsTaken(node1, MAZE_VIZ_TYPE.PATH);

        if (node2) {
            let midNode = this.gridClass.getMidNode(node1, node2);
            midNode.setIsMazePath(true);
            this.addToStepsTaken(midNode, MAZE_VIZ_TYPE.PATH);
        }
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
        let start = this.getNode(0, 0);
        let frontier = [start];
        let rand, cur, neighbors;

        while (frontier.length) {
            rand = this.random(frontier.length);
            cur = frontier.splice(rand, 1)[0];
            cur.setCellVisited(true);
            this.addStep(cur, cur.parent);

            neighbors = this.gridClass.getNeighborCells(cur, (neighbor) => neighbor.cellVisited || neighbor.inFrontier);
            neighbors.forEach(n => {
                n.setInFrontier(true);
                n.setParent(cur);
            });
            frontier.push(...neighbors);
        }

        return this.grid;
    }

    random(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        this.grid = this.gridClass.initGrid(PrimNode);
        return this.generateMaze();
    }
}