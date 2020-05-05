import { EllerNode } from '../nodes.js';
import { MAZE_VIZ_TYPE } from '../constants.js';

export default class Eller {
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