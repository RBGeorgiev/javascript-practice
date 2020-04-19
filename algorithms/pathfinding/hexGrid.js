import { Node } from './src/nodes.js';
import { GRID_NODE_TYPES, GRID_NODE_COLORS } from './src/enums.js';
// import { canvas, ctx } from './constants.js';

let canvas = document.getElementById("testCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "1px solid black";

// pointyHexCorner = (x, y, size, i) => {
//     let angle_deg = 60 * i - 30;
//     let angle_rad = Math.PI / 180 * angle_deg;
//     return [x + size * Math.cos(angle_rad), y + size * Math.sin(angle_rad)];
// }

export default class HexGrid {
    constructor(sizeX, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
    }

    drawAllHexNodes = () => {
        let width = this.grid.length;
        for (let x = 0; x < width; x++) {
            let height = this.grid[x].length;
            for (let y = 0; y < height; y++) {
                let node = this.getNode(x, y);
                this.drawHexNode(node);
            }
        }
    }

    drawHexNode = (node) => {
        let x = node.vertices[0][0];
        let y = node.vertices[0][1];

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < 6; i++) {
            x = node.vertices[i][0];
            y = node.vertices[i][1];
            ctx.lineTo(x, y);
        }

        ctx.closePath();

        ctx.fillStyle = this.getNodeColor(node);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";

        ctx.fill();
        ctx.stroke();
    }

    flatHexCorner = (x, y, size, i) => {
        let angle_deg = 60 * i;
        let angle_rad = Math.PI / 180 * angle_deg;
        let cornerX = x + size * Math.cos(angle_rad);
        let cornerY = y + size * Math.sin(angle_rad);
        return (cornerX > canvas.width || cornerY > canvas.height) ? null : [cornerX, cornerY];
    }

    getHexCorners = (x, y, size) => {
        let vertices = [];

        for (let i = 0; i < 6; i++) {
            let corner = this.flatHexCorner(x, y, size, i);
            if (corner === null) return null;
            vertices.push(corner);
        }

        return vertices;
    }


    // getNeighbors = (node) => {
    //     let neighbors = [];

    //     for (let x = -1; x <= 1; x++) {
    //         for (let y = -1; y <= 1; y++) {
    //             if (x === 0 && y === 0) continue;

    //             let adjX = node.x + x;
    //             let adjY = node.y + y;

    //             if (
    //                 adjX >= 0 && adjX < this.gridSizeX &&
    //                 adjY >= 0 && adjY < this.gridSizeY
    //             ) {
    //                 neighbors.push(
    //                     this.getNode(adjX, adjY)
    //                 );
    //             }
    //         }
    //     }

    //     return neighbors;
    // }

    getNode = (x, y) => this.grid[x][y];

    getNodeColor = (node) => GRID_NODE_COLORS[node.type];

    // getNodeFromCoordinates = (x, y) => {
    //     let gridX = Math.floor(x / this.nodeSize);
    //     let gridY = Math.floor(y / this.nodeSize);

    //     if (gridX < 0 || gridX >= this.gridSizeX ||
    //         gridY < 0 || gridY >= this.gridSizeY) {
    //         return null;
    //     }

    //     return this.getNode(gridX, gridY);
    // }

    initHexGrid = (pathfindingNode) => {
        let adjustedSize = this.nodeSize / 1.5;

        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                // get hex center position 
                let w = 2 * adjustedSize;
                let h = Math.sqrt(3) * adjustedSize;
                let posX = (w * 3 / 4) * x
                let posY = h * y;
                let offset = (x % 2 === 1) ? h / 2 : 0;

                // get vertices positions based on center position
                let vertices = this.getHexCorners(
                    posX + w / 2,
                    posY + h / 2 + offset,
                    adjustedSize
                );

                if (vertices) {
                    if (!this.grid[x]) this.grid[x] = [];
                    let node = new pathfindingNode(x, y);
                    node.vertices = vertices;
                    this.grid[x][y] = node;
                }
            }
        }
    }

    // transferGridState = (pathfindingNode) => {
    //     for (let x = 0; x < this.gridSizeX; x++) {
    //         for (let y = 0; y < this.gridSizeY; y++) {
    //             let oldNode = this.getNode(x, y);
    //             let type = oldNode.type;
    //             this.grid[x][y] = new pathfindingNode(x, y, type);
    //         }
    //     }
    // }

    // transferMazeToGrid = (maze, pathfindingNode) => {
    //     for (let x = 0; x < this.gridSizeX; x++) {
    //         for (let y = 0; y < this.gridSizeY; y++) {
    //             let type = (maze[x][y].isMazePath) ? GRID_NODE_TYPES.EMPTY : GRID_NODE_TYPES.UNWALKABLE;
    //             this.grid[x][y] = new pathfindingNode(x, y, type);
    //         }
    //     }
    // }
}

let hexGrid = new HexGrid(51);

hexGrid.initHexGrid(Node);
hexGrid.drawAllHexNodes();