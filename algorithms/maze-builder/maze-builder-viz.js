import { Node } from './nodes.js';
import MAZE_ALGORITHMS from './algorithms-enum.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

export const MAZE_VIZ_TYPE = {
    PATH: "#FFFFFF",
    TRACEBACK: "#FF0000"
}

export class MazeBuilderVisualization {
    constructor(mazeBuilder) {
        this.gridSizeX = mazeBuilder.gridSizeX;
        this.gridSizeY = mazeBuilder.gridSizeY;
        this.mazeBuilder = mazeBuilder;
        this.grid = [];

        this.nodeSize = canvas.width / this.gridSizeX;
        this.animFrameId = null;
    }

    animateSteps = (stepsTaken) => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = stepsTaken.length;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i >= len - 1) return;

            this.visualizeStep(stepsTaken[i]);

            i++;

            this.setAnimFrameId(
                window.requestAnimationFrame(step)
            );
        }

        this.setAnimFrameId(
            window.requestAnimationFrame(step)
        );
    }

    buildMaze = () => {
        this.initViz();
        console.time('Generate Maze');
        this.mazeBuilder.run();
        console.timeEnd('Generate Maze');
    }

    changeAlgorithm = (algorithm) => {
        this.stopAnimFrame();
        this.mazeBuilder.setAlgorithm(algorithm);
        this.drawAllNodes();
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

    initEventListeners = () => {
        createMazeBtn.onclick = () => {
            this.stopAnimFrame();
            this.buildMaze();
            let stepsTaken = this.mazeBuilder.getStepsTaken();
            this.animateSteps(stepsTaken);
        }

        algorithmSelect.onchange = () => {
            algorithmSelect.blur();
            this.changeAlgorithm(MAZE_ALGORITHMS[algorithmSelect.value]);
        }
    }

    init = () => {
        for (let x = 0; x < this.gridSizeX; x++) {
            this.grid[x] = [];
            for (let y = 0; y < this.gridSizeY; y++) {
                this.grid[x][y] = new Node(x, y);
            }
        }
    }

    initViz = () => {
        this.init();
        this.drawAllNodes();
    }

    replaceGrid = (newGrid) => this.grid = newGrid;

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    setAnimFrameId = (id) => this.animFrameId = id;

    visualizeStep = (step) => this.drawNode(step.node, step.type);
}