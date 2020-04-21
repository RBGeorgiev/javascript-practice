import { GRID_NODE_TYPES, GRID_NODE_COLORS } from './src/enums.js';
import { canvas, ctx } from './src/constants.js';

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

    cubeCoordRound = (x, y, z) => {
        let rx = Math.round(x);
        let ry = Math.round(y);
        let rz = Math.round(z);

        let x_diff = Math.abs(rx - x);
        let y_diff = Math.abs(ry - y);
        let z_diff = Math.abs(rz - z);

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry - rz;
        } else if (y_diff > z_diff) {
            ry = -rx - rz;
        } else {
            rz = -rx - ry;
        }

        return {
            x: rx,
            y: ry,
            z: rz
        };
    }

    drawAllNodes = () => {
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

    getHexNodeFromCanvasCoordinates = (x, y) => {
        let size = this.nodeSize / 1.5;

        let w = 2 * size;
        let h = Math.sqrt(3) * size;

        let posX = x - w / 2;
        let offset = (posX % 2 === 0) ? h / 2 : 0;
        let posY = y - h + offset;

        let q = (2 / 3 * posX) / size;
        let r = (-1 / 3 * posX + Math.sqrt(3) / 3 * posY) / size;

        return this.getNodeFromCubeCoord(
            this.cubeCoordRound(q, -q - r, r)
        );
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


    getNeighbors = (node) => {
        let directions = [
            // for odd columns
            [
                [+1, 0], [+1, -1], [0, -1],
                [-1, -1], [-1, 0], [0, +1]
            ],
            // for even columns
            [
                [+1, +1], [+1, 0], [0, -1],
                [-1, 0], [-1, +1], [0, +1]
            ],
        ]

        let neighbors = [];

        for (let i = 0; i < 6; i++) {
            var parity = +(node.x % 2 === 0);
            var dir = directions[parity][i];

            let adjX = node.x + dir[0];
            let adjY = node.y + dir[1];

            if (
                adjX >= 0 && adjX < this.gridSizeX &&
                adjY >= 0 && adjY < this.gridSizeY
            ) {
                neighbors.push(
                    this.getNode(adjX, adjY)
                );
            }
        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

    getNodeColor = (node) => GRID_NODE_COLORS[node.type];

    getNodeFromCubeCoord = (obj) => {
        let col = obj.x;
        let row = obj.z + (obj.x + (obj.x & 1)) / 2;
        return this.getNode(col, row);
    }

    initGrid = (pathfindingNode) => {
        let adjustedSize = this.nodeSize / 1.5;

        for (let x = 0; x < this.gridSizeX; x++) {
            for (let y = 0; y < this.gridSizeY; y++) {
                // get hex center position 
                let w = 2 * adjustedSize;
                let h = Math.sqrt(3) * adjustedSize;
                let posX = (w * 3 / 4) * x
                let posY = h * y;
                let offset = (x % 2 === 0) ? h / 2 : 0;

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

    transferGridState = (pathfindingNode) => {
        let sizeX = this.grid.length;
        for (let x = 0; x < sizeX; x++) {
            let sizeY = this.grid[x].length;
            for (let y = 0; y < sizeY; y++) {
                let oldNode = this.getNode(x, y);
                let type = oldNode.type;
                let newNode = new pathfindingNode(x, y, type);
                newNode.vertices = oldNode.vertices;
                this.grid[x][y] = newNode;
            }
        }
    }

    // transferMazeToGrid = (maze, pathfindingNode) => {
    //     for (let x = 0; x < this.gridSizeX; x++) {
    //         for (let y = 0; y < this.gridSizeY; y++) {
    //             let type = (maze[x][y].isMazePath) ? GRID_NODE_TYPES.EMPTY : GRID_NODE_TYPES.UNWALKABLE;
    //             this.grid[x][y] = new pathfindingNode(x, y, type);
    //         }
    //     }
    // }
}