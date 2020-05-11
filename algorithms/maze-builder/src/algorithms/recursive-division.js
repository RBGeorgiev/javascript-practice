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

    generateMaze = () => {
        const drawVerticalWall = (x, startY, endY) => {
            for (let i = startY; i < endY; i++) {
                let cur = this.getNode(x, i);
                this.gridClass.drawNode(cur, 'black');
            }
        }

        const drawHorizontalWall = (y, startX, endX) => {
            for (let i = startX; i < endX; i++) {
                let cur = this.getNode(i, y);
                this.gridClass.drawNode(cur, 'black');
            }
        }

        const getRandomWall = (min, max) => {
            let wallsNum = Math.floor((max - min) / 2) //number of wall positions
            let randWall = (this.random(0, wallsNum) * 2) + 1 //random wall
            let realWallPos = min + randWall; //actual wall position
            return realWallPos;
        }

        const generateWall = (startX, endX, startY, endY) => {
            let width = endX - startX;
            let height = endY - startY;
            if (width < 2 || height < 2) return;
            let randX = getRandomWall(startX, endX);
            let randY = getRandomWall(startY, endY);
            let node;

            let dir = (width > height) ? 'v' : 'h';
            if (dir === 'v') {
                drawVerticalWall(randX, startY, endY);

                let a = Math.floor(height / 2);
                let b = this.random(0, a) * 2;
                let c = startY + b;
                node = this.getNode(randX, c);
            } else {
                drawHorizontalWall(randY, startX, endX);

                let a = Math.floor(width / 2);
                let b = this.random(0, a) * 2;
                let c = startX + b;
                node = this.getNode(c, randY);
            }
            this.gridClass.drawNode(node, 'white');

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