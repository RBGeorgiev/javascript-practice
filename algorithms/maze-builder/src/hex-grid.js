export default class HexGrid {
    constructor(ctx, sizeX, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.nodeSize = canvas.width / this.gridSizeX;
        this.grid = [];
        this.ctx = ctx;
    }

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

    drawNode = (node, color = '#000000') => {
        let ctx = this.ctx;
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

        // ctx.fillStyle = color ? color : (node.x % 4 === 0 && node.y % 2 === 0 || (node.x - 2) % 4 === 0 && node.y % 2 === 1) ? "white" : "black";
        ctx.fillStyle = color;
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

    getMidNode = (A, B) => {
        let dirTable = {
            "x-2y-1": [-1, 0],
            "x0y-2": [0, -1],
            "x2y-1": [+1, 0],
            "x2y1": [+1, +1],
            "x0y2": [0, +1],
            "x-2y1": [-1, +1]
        }

        let dx = B.x - A.x;
        let dy = B.y - A.y;
        let key = `x${dx}y${dy}`;

        let midX = A.x + dirTable[key][0];
        let midY = A.y + dirTable[key][1];

        return this.getNode(midX, midY);
    }

    getNeighborCells = (node) => {
        let directions = [
            // for even columns
            [-2, -1], [0, -2], [+2, -1],
            [+2, +1], [0, +2], [-2, +1]
        ];

        let neighbors = [];

        for (let i = 0; i < 6; i++) {
            let dir = directions[i];

            let adjX = node.x + dir[0];
            let adjY = node.y + dir[1];

            if (
                adjX >= 0 && adjX < this.grid.length &&
                adjY >= 0 && adjY < this.grid[adjX].length
            ) {
                let neighbor = this.getNode(adjX, adjY);
                if (!neighbor.cellVisited) neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    getNode = (x, y) => this.grid[x][y];

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

    reset = (nodeClass) => {
        this.initGrid(nodeClass);
        this.drawAllNodes();
    }
}