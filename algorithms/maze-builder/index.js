let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1600;
canvas.height = 800;

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cellVisited = false;
        this.numOfNeighborCells = undefined;
    }

    setCellVisited = (bool) => this.cellVisited = bool;

    setNumOfNeighborCells = (num) => this.numOfNeighborCells = num;
}

class Grid {
    constructor() {
        this.gridSizeX = 50;
        this.gridSizeY = 25;
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                this.drawNode(x, y);
            }
        }
    }

    drawNode = (x, y, color = "#FFFFFF") => {
        let size = this.nodeSize;
        let posX = x * size;
        let posY = y * size;

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
}

class MazeBuilder {
    constructor(grid) {
        this.gridClass = grid;
        this.grid = grid.grid;

        this.cellSize = 2;
        this.numOfCells = Math.ceil(this.gridClass.gridSizeX / this.cellSize) * Math.ceil(this.gridClass.gridSizeY / this.cellSize);
    }

    getNeighborCells = (node) => {
        let neighbors = [];
        let cellSize = this.cellSize;
        let width = this.gridClass.gridSizeX;
        let height = this.gridClass.gridSizeY;

        for (let x = -cellSize; x <= cellSize; x += cellSize) {
            for (let y = -cellSize; y <= cellSize; y += cellSize) {
                if (x === 0 & y === 0 || Math.abs(x) === Math.abs(y)) continue;

                let adjX = node.x + x;
                let adjY = node.y + y;

                if (
                    adjX >= 0 && adjX < width &&
                    adjY >= 0 && adjY < height
                ) {
                    let neighbor = this.gridClass.getNode(adjX, adjY);
                    if (!neighbor.cellVisited) neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

    run = () => {
        let cellsChecked = 0;
        let numOfCells = this.numOfCells;

        const getRandomCell = (arr) => {
            let min = 0;
            let max = arr.length - 1;
            let num = Math.floor(Math.random() * (max - min + 1)) + min;

            return arr[num];
        }

        let stack = [];
        let cur = this.gridClass.getNode(0, 0);

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

            let offsetX = (next.x - cur.x) / this.cellSize;
            let offsetY = (next.y - cur.y) / this.cellSize;
            this.gridClass.drawNode(cur.x, cur.y, "black");
            this.gridClass.drawNode(cur.x + offsetX, cur.y + offsetY, "black");

            cur = next;
        }
    }
}

let grid = new Grid;
grid.init();
grid.drawAllNodes();

let mazeBuilder = new MazeBuilder(grid);
mazeBuilder.run();