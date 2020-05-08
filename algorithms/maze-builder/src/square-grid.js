export default class SquareGrid {
    constructor(ctx, sizeX, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
        this.ctx = ctx;
    }

    drawAllNodes = () => {
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                let node = this.getNode(x, y);
                this.drawNode(node);
            }
        }
    }

    drawNode = (node, color = '#000000') => {
        let ctx = this.ctx;
        let size = this.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "darkgray";
        ctx.rect(xPos, yPos, size, size);
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    }

    getMidNode = (A, B) => {
        let dirX = (B.x - A.x) / 2;
        let dirY = (B.y - A.y) / 2;

        return this.getNode(A.x + dirX, A.y + dirY);
    }

    getNeighborCells = (node, callback) => {
        let neighbors = [];
        let width = this.gridSizeX;
        let height = this.gridSizeY;

        let neighborPositions = [
            [2, 0], // East
            [-2, 0], // West
            [0, 2], // South
            [0, -2] // North
        ]

        for (let i = 0; i < neighborPositions.length; i++) {
            let offsetX = neighborPositions[i][0];
            let offsetY = neighborPositions[i][1];

            let adjX = node.x + offsetX;
            let adjY = node.y + offsetY;

            if (
                adjX >= 0 && adjX < width &&
                adjY >= 0 && adjY < height
            ) {
                let neighbor = this.getNode(adjX, adjY);
                // callback to exclude nodes
                if (callback(neighbor)) continue;
                neighbors.push(neighbor);
            }

        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

    getNodeColor = (node) => (node.isMazePath) ? "white" : "black";

    initGrid = (nodeClass) => {
        this.grid = [];
        let width = this.gridSizeX;
        let height = this.gridSizeY;

        for (let x = 0; x < width; x++) {
            this.grid[x] = [];
            for (let y = 0; y < height; y++) {
                this.grid[x][y] = new nodeClass(x, y);
            }
        }

        return this.grid;
    }

    reset = (nodeClass) => {
        this.initGrid(nodeClass);
        this.drawAllNodes();
    }
}