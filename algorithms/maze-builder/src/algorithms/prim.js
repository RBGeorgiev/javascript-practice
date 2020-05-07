import { PrimNode } from '../nodes.js';
import { MAZE_VIZ_TYPE } from '../constants.js';

export default class Prim {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    addStep = (node1, node2) => {
        let dx = (node2.x - node1.x) / 2;
        let dy = (node2.y - node1.y) / 2;
        let midNode = this.getNode(node1.x + dx, node1.y + dy);

        node1.setIsMazePath(true);
        midNode.setIsMazePath(true);

        this.addToStepsTaken(node1, MAZE_VIZ_TYPE.PATH);
        this.addToStepsTaken(midNode, MAZE_VIZ_TYPE.PATH);
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
        start.setCellVisited(true);
        start.setIsMazePath(true);
        this.addToStepsTaken(start, MAZE_VIZ_TYPE.PATH);

        let neighbors = this.gridClass.getNeighborCells(start);
        neighbors.forEach(n => {
            n.setInFrontier(true);
            n.setParent(start);
        });
        let frontier = [...neighbors];

        while (frontier.length) {
            let rand = this.random(frontier.length);
            let cur = frontier[rand];
            frontier.splice(rand, 1);
            if (cur.cellVisited) continue;
            cur.setCellVisited(true);
            this.addStep(cur, cur.parent);

            let neighbors = this.gridClass.getNeighborCells(cur, (neighbor) => !neighbor.cellVisited && !neighbor.InFrontier);
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