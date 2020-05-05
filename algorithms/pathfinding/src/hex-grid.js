import { GRID_NODE_TYPES, GRID_NODE_COLORS } from './enums.js';
import { canvas, ctx } from './constants.js';

// flat top even column downward offset layout i.e. "even-q" vertical layout
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

    clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAllNodes = () => {
        let width = this.grid.length;
        for (let x = 0; x < width; x++) {
            let height = this.grid[x].length;
            for (let y = 0; y < height; y++) {
                let node = this.getNode(x, y);
                this.drawNode(node);
            }
        }
    }

    drawNode = (node) => {
        let x = node.hexVertices[0][0];
        let y = node.hexVertices[0][1];

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 1; i < 6; i++) {
            x = node.hexVertices[i][0];
            y = node.hexVertices[i][1];
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

    getHexVertices = (x, y, size) => {
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
            let parity = +(node.x % 2 === 0);
            let dir = directions[parity][i];

            let adjX = node.x + dir[0];
            let adjY = node.y + dir[1];

            if (
                adjX >= 0 && adjX < this.grid.length &&
                adjY >= 0 && adjY < this.grid[adjX].length
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

    getNodeFromCanvasCoordinates = (x, y) => {
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

    getNodeFromCubeCoord = (obj) => {
        let col = obj.x;
        let row = obj.z + (obj.x + (obj.x & 1)) / 2;
        if (
            col < 0
            ||
            col >= this.grid.length
            ||
            row < 0
            ||
            row >= this.grid[col].length
        ) {
            return null;
        }
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

                let center = {
                    x: posX + w / 2,
                    y: posY + h / 2 + offset
                }
                // get vertices positions based on center position
                let vertices = this.getHexVertices(
                    center.x,
                    center.y,
                    adjustedSize
                );

                if (vertices) {
                    if (!this.grid[x]) this.grid[x] = [];
                    let node = new pathfindingNode(x, y);
                    node.setHexCenter(center);
                    node.setHexVertices(vertices);
                    node.setIsHex(true);
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
                newNode.setHexCenter(oldNode.hexCenter);
                newNode.setHexVertices(oldNode.hexVertices);
                newNode.setIsHex(true);
                this.grid[x][y] = newNode;
            }
        }
    }

    transferMazeToGrid = (maze, pathfindingNode) => {
        let width = maze.length;
        for (let x = 0; x < width; x++) {
            let height = maze[x].length;
            for (let y = 0; y < height; y++) {
                let mazeNode = maze[x][y];
                let type = (mazeNode.isMazePath) ? GRID_NODE_TYPES.EMPTY : GRID_NODE_TYPES.UNWALKABLE;
                let center = mazeNode.hexCenter;
                let vertices = mazeNode.hexVertices;

                let pfNode = new pathfindingNode(x, y, type);
                pfNode.setHexCenter(center);
                pfNode.setHexVertices(vertices);
                pfNode.setIsHex(true);

                this.grid[x][y] = pfNode;
            }
        }
    }
}