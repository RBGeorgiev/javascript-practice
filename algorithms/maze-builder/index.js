let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let createMazeBtn = document.getElementById("createMazeBtn");

canvas.width = 1600;
canvas.height = 800;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class MazeNode extends Node {
    constructor(x, y) {
        super(x, y);
        this.cellVisited = false;
        this.numOfNeighborCells = undefined;
        this.isMazePath = false;
    }

    setCellVisited = (bool) => this.cellVisited = bool;

    setIsMazePath = (bool) => this.isMazePath = bool;

    setNumOfNeighborCells = (num) => this.numOfNeighborCells = num;
}

class GridViz {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                let node = this.getNode(x, y);
                let color = (node.isMazePath) ? "white" : "black";
                this.drawNode(node, color);
            }
        }
    }

    drawNode = (node, color = "#FFFFFF") => {
        let size = this.nodeSize;
        let posX = node.x * size;
        let posY = node.y * size;

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";
        ctx.rect(posX, posY, size, size);
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    }

    getNode = (x, y) => this.grid[x][y];

    init = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new Node(x, y);
            }
        }
    }

    replaceGrid = (newGrid) => this.grid = newGrid;
}

class MazeBuilder {
    constructor(gridSizeX, gridSizeY) {
        this.gridSizeX = gridSizeX;
        this.gridSizeY = gridSizeY;
        this.grid = [];

        this.cellSize = 2;
        this.numOfCells = Math.ceil(this.gridSizeX / this.cellSize) * Math.ceil(this.gridSizeY / this.cellSize);
    }

    getNeighborCells = (node) => {
        let neighbors = [];
        let cellSize = this.cellSize;
        let width = this.gridSizeX;
        let height = this.gridSizeY;

        for (let x = -cellSize; x <= cellSize; x += cellSize) {
            for (let y = -cellSize; y <= cellSize; y += cellSize) {
                if (x === 0 & y === 0 || Math.abs(x) === Math.abs(y)) continue;

                let adjX = node.x + x;
                let adjY = node.y + y;

                if (
                    adjX >= 0 && adjX < width &&
                    adjY >= 0 && adjY < height
                ) {
                    let neighbor = this.getNode(adjX, adjY);
                    if (!neighbor.cellVisited) neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

    generateNewMaze = () => {
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

            let neighbors = this.getNeighborCells(cur);
            cur.setNumOfNeighborCells(neighbors.length);

            if (!neighbors.length) {
                for (let i = stack.length - 1; i >= 0; i--) {
                    if (stack[i].numOfNeighborCells > 0) {
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

    initGrid = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new MazeNode(x, y);
            }
        }
    }

    run = () => {
        this.initGrid();
        return this.generateNewMaze();
    }

    setMazePathNode = (cur, next) => {
        let dirX = (next.x - cur.x) / this.cellSize;
        let dirY = (next.y - cur.y) / this.cellSize;

        let midNode = this.getNode(cur.x + dirX, cur.y + dirY);

        cur.setIsMazePath(true);
        midNode.setIsMazePath(true);
    }
}

let gridSizeX = 50;
let gridSizeY = gridSizeX / 2;

let gridViz = new GridViz(gridSizeX, gridSizeY);
let mazeBuilder = new MazeBuilder(gridSizeX, gridSizeY);

let mazeGrid = mazeBuilder.run();
gridViz.replaceGrid(mazeGrid);
gridViz.drawAllNodes();

createMazeBtn.onclick = () => {
    let mazeGrid = mazeBuilder.run();
    gridViz.replaceGrid(mazeGrid);
    gridViz.drawAllNodes();
}