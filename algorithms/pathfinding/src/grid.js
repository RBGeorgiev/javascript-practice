import { GRID_NODE_TYPES, GRID_NODE_COLORS } from './enums.js';
import { canvas, ctx } from './constants.js';

export default class Grid {
    constructor(sizeX = 50, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                let node = this.getNode(x, y);
                this.drawNode(node);
            }
        }
    }

    drawNode = (node) => {
        let size = this.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;
        let color = this.getNodeColor(node);

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";
        ctx.rect(xPos, yPos, size, size);
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    }

    getNeighbors = (node) => {
        let neighbors = [];

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;

                let adjX = node.x + x;
                let adjY = node.y + y;

                if (
                    adjX >= 0 && adjX < this.gridSizeX &&
                    adjY >= 0 && adjY < this.gridSizeY
                ) {
                    neighbors.push(
                        this.getNode(adjX, adjY)
                    );
                }
            }
        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

    getNodeColor = (node) => GRID_NODE_COLORS[node.type];

    getNodeFromCoordinates = (x, y) => {
        let gridX = Math.floor(x / this.nodeSize);
        let gridY = Math.floor(y / this.nodeSize);

        if (gridX < 0 || gridX >= this.gridSizeX ||
            gridY < 0 || gridY >= this.gridSizeY) {
            return null;
        }

        return this.getNode(gridX, gridY);
    }

    initGrid = (pathfindingNode) => {
        this.grid = [];
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new pathfindingNode(x, y);
            }
        }
    }

    transferGridState = (pathfindingNode) => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                let oldNode = this.getNode(x, y);
                let type = oldNode.type;
                this.grid[x][y] = new pathfindingNode(x, y, type);
            }
        }
    }

    transferMazeToGrid = (maze, pathfindingNode) => {
        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                let type = (maze[x][y].isMazePath) ? GRID_NODE_TYPES.EMPTY : GRID_NODE_TYPES.UNWALKABLE;
                this.grid[x][y] = new pathfindingNode(x, y, type);
            }
        }
    }
}