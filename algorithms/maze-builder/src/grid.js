export default class Grid {
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

    drawNode = (node) => {
        let ctx = this.ctx;
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

    // getMidNodeSquare = (A, B) => {
    //     let dirX = (B.x - A.x) / 2;
    //     let dirY = (B.y - A.y) / 2;

    //     return this.getNode(A.x + dirX, A.y + dirY);
    // }

    // getNeighborCellsSquare = (node) => {
    //     let neighbors = [];
    //     let cellSize = this.cellSize;
    //     let width = this.gridClass.gridSizeX;
    //     let height = this.gridClass.gridSizeY;

    //     let neighborPositions = [
    //         [cellSize, 0], // East
    //         [-cellSize, 0], // West
    //         [0, cellSize], // South
    //         [0, -cellSize] // North
    //     ]

    //     for (let i = 0; i < neighborPositions.length; i++) {
    //         let offsetX = neighborPositions[i][0];
    //         let offsetY = neighborPositions[i][1];

    //         let adjX = node.x + offsetX;
    //         let adjY = node.y + offsetY;

    //         if (
    //             adjX >= 0 && adjX < width &&
    //             adjY >= 0 && adjY < height
    //         ) {
    //             let neighbor = this.getNode(adjX, adjY);
    //             if (!neighbor.cellVisited) neighbors.push(neighbor);
    //         }

    //     }

    //     return neighbors;
    // }

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
    }

    reset = (nodeClass) => {
        this.initGrid(nodeClass);
        this.drawAllNodes();
    }
}