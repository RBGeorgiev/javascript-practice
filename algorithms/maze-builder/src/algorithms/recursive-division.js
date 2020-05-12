import { MAZE_VIZ_TYPE } from '../constants.js';

export default class RecursiveDivision {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.stepsTaken = [];
    }

    addStep = (node, isPath) => {
        let type = isPath ? MAZE_VIZ_TYPE.PATH : MAZE_VIZ_TYPE.WALL;
        node.setIsMazePath(isPath);
        this.addToStepsTaken(node, type);
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    drawHorizontalWall = (y, startX, endX) => {
        for (let i = startX; i < endX; i++) {
            let node = this.getNode(i, y);
            this.addStep(node, false);
        }
    }

    drawVerticalWall = (x, startY, endY) => {
        for (let i = startY; i < endY; i++) {
            let node = this.getNode(x, i);
            this.addStep(node, false);
        }
    }

    getNode = (x, y) => this.grid[x][y];

    getRandNodeCoord = (min, max, isWall) => {
        let wall = (isWall) ? 1 : 0;
        let cellsNum = Math.floor((max - min) / 2); // number of cells
        let randCell = (this.random(0, cellsNum) * 2) + wall; // get random cell
        let realNodePos = min + randCell; // get actual node position in grid
        return realNodePos;
    }

    getStepsTaken = () => this.stepsTaken;

    generateMaze = () => {
        const generateWall = (startX, endX, startY, endY) => {
            let width = endX - startX;
            let height = endY - startY;
            if (width < 2 || height < 2) return;
            let randX = this.getRandNodeCoord(startX, endX, true);
            let randY = this.getRandNodeCoord(startY, endY, true);
            let node;

            let dir = (width > height) ? 'v' : 'h';
            if (dir === 'v') {
                this.drawVerticalWall(randX, startY, endY);
                let randPathY = this.getRandNodeCoord(startY, endY, false);
                node = this.getNode(randX, randPathY);
            } else {
                this.drawHorizontalWall(randY, startX, endX);
                let randPathX = this.getRandNodeCoord(startX, endX, false);
                node = this.getNode(randPathX, randY);
            }
            this.addStep(node, true);

            if (dir === 'v') {
                generateWall(randX + 1, endX, startY, endY); //right
                generateWall(startX, randX, startY, endY); //left
            } else {
                generateWall(startX, endX, startY, randY); //up
                generateWall(startX, endX, randY + 1, endY); //down
            }
        }

        generateWall(0, this.grid.length, 0, this.grid[0].length);

        return this.grid;
    }

    random = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    resetStepsTaken = () => this.stepsTaken = [];

    run = () => {
        this.resetStepsTaken();
        return this.generateMaze();
    }
}