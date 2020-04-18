import Grid from './grid.js'
import { Node } from './nodes.js';
import { GRID_NODE_TYPES, PATHFINDING_ALGORITHMS } from './enums.js';
import { AStar } from './pf.js';
import PathfindingVisualization from './pf-viz.js';
import {
    canvas,
    animSpeedInput,
    animSpeedSpan,
    clearPathBtn,
    clearWallsBtn,
    pathfindingAlgorithmSelect,
    runAlgorithmBtn,
    createMazeBtn,
    mazeAlgorithmSelect,
    timerTextSpan,
    timerNumberSpan
} from './constants.js';
import MazeBuilder from '../../maze-builder/src/maze-builder.js';
import { MAZE_ALGORITHMS } from '../../maze-builder/src/constants.js';

export default class Main {
    constructor(gridWidth = 51) {
        this.grid = new Grid(gridWidth);
        this.grid.initGrid(Node);

        this.currentAlgorithm = new AStar(this.grid);
        this.pathfindingViz = new PathfindingVisualization(this.grid);
        this.mazeBuilder = new MazeBuilder(this.grid.gridSizeX, this.grid.gridSizeY, MAZE_ALGORITHMS[mazeAlgorithmSelect.value]);

        this.init();
        this.initEventListeners();
        this.initOptions();
    }

    init = () => {
        this.currentAlgorithm.setStartNode(this.grid.getNode(10, 8));
        this.currentAlgorithm.setEndNode(this.grid.getNode(23, 8));

        this.grid.drawAllNodes();
    }

    changeAlgorithm = (algorithm) => {
        this.pathfindingViz.stopAnimFrame();

        let start = this.currentAlgorithm.startNode;
        let end = this.currentAlgorithm.endNode;

        this.currentAlgorithm = new algorithm(this.grid);

        this.currentAlgorithm.setStartNode(this.grid.getNode(start.x, start.y));
        this.currentAlgorithm.setEndNode(this.grid.getNode(end.x, end.y));

        this.grid.drawAllNodes();
    }

    displayTimeInHTML = (timeTaken, pathFoundBool) => {
        let time = Math.round((timeTaken + Number.EPSILON) * 100) / 100;
        let displayStr = `${pathfindingAlgorithmSelect.value}: ${time}ms`;
        timerTextSpan.innerText = (pathFoundBool) ? "Path found:" : "Path doesn't exist:";
        timerNumberSpan.innerText = displayStr;
        console.log(displayStr, `(${timeTaken})`);
    }

    runCurrentAlgorithm = () => {
        let timeStart = window.performance.now();
        let pathFoundBool = this.currentAlgorithm.run();
        let timeEnd = window.performance.now();

        let timeTaken = timeEnd - timeStart;
        this.displayTimeInHTML(timeTaken, pathFoundBool);

        let stepsTaken = this.currentAlgorithm.getStepsTaken();
        this.pathfindingViz.visualizationController(stepsTaken, this.currentAlgorithm.complete);
    }

    addUnwalkable = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY) {
            node.setType(GRID_NODE_TYPES.UNWALKABLE);
            this.grid.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    addEmpty = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.UNWALKABLE || node.type === GRID_NODE_TYPES.SWAMP) {
            node.setType(GRID_NODE_TYPES.EMPTY);
            this.grid.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    addSwamp = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY) {
            node.setType(GRID_NODE_TYPES.SWAMP);
            this.grid.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    dragStart = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        let oldStart = this.currentAlgorithm.startNode;
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY && oldStart !== node) {
            oldStart.setType(GRID_NODE_TYPES.EMPTY);
            this.grid.drawNode(oldStart);

            this.currentAlgorithm.setStartNode(node);
            this.grid.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                oldStart.resetPathfindingValues();
                this.runCurrentAlgorithm();
            }
        }
    }

    dragEnd = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        let oldEnd = this.currentAlgorithm.endNode;
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY && oldEnd !== node) {
            oldEnd.setType(GRID_NODE_TYPES.EMPTY);
            this.grid.drawNode(oldEnd);

            this.currentAlgorithm.setEndNode(node);
            this.grid.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                oldEnd.resetPathfindingValues();
                this.runCurrentAlgorithm();
            }
        }
    }

    handleMouseDown = (e) => {
        let node = this.grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
        let listener;

        switch (node.type) {
            case GRID_NODE_TYPES.EMPTY:
                if (e.buttons === 1) {
                    listener = this.addUnwalkable;
                    this.addUnwalkable(e);
                    canvas.addEventListener('mousemove', this.addUnwalkable);
                } else if (e.buttons === 2) {
                    listener = this.addSwamp;
                    this.addSwamp(e);
                    canvas.addEventListener('mousemove', this.addSwamp);
                }
                break;

            case GRID_NODE_TYPES.START:
                listener = this.dragStart;
                canvas.addEventListener('mousemove', this.dragStart);
                break;

            case GRID_NODE_TYPES.END:
                listener = this.dragEnd;
                canvas.addEventListener('mousemove', this.dragEnd);
                break;

            default:
                listener = this.addEmpty;
                this.addEmpty(e);
                canvas.addEventListener('mousemove', this.addEmpty);
        }

        canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', listener));
    }

    initEventListeners = () => {
        canvas.addEventListener('mousedown', (e) => {
            this.pathfindingViz.stopAnimFrame();
            this.handleMouseDown(e)
        });

        document.addEventListener('keydown', (e) => {
            // Space and Enter
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.pathfindingViz.stopAnimFrame();
                this.currentAlgorithm.setComplete(false);
                this.runCurrentAlgorithm();
                this.currentAlgorithm.setComplete(true);
            }
        });
    }


    initOptions = () => {
        runAlgorithmBtn.onclick = () => {
            runAlgorithmBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            this.currentAlgorithm.setComplete(false);
            this.runCurrentAlgorithm();
            this.currentAlgorithm.setComplete(true);
        }

        pathfindingAlgorithmSelect.onchange = () => {
            pathfindingAlgorithmSelect.blur();
            timerTextSpan.innerText = "";
            timerNumberSpan.innerText = "";
            this.changeAlgorithm(PATHFINDING_ALGORITHMS[pathfindingAlgorithmSelect.value]);
        }

        mazeAlgorithmSelect.onchange = () => {
            mazeAlgorithmSelect.blur();
            this.mazeBuilder.setAlgorithm(MAZE_ALGORITHMS[mazeAlgorithmSelect.value]);
        }

        animSpeedInput.oninput = (e) => {
            animSpeedInput.blur();
            let val = +e.target.value;
            this.pathfindingViz.setAnimSpeed(val);
            animSpeedSpan.innerHTML = val;
        }

        clearPathBtn.onclick = () => {
            clearPathBtn.blur();
            this.currentAlgorithm.reset();
            this.currentAlgorithm.setComplete(false);
        }

        clearWallsBtn.onclick = () => {
            clearWallsBtn.blur();
            let start = this.currentAlgorithm.startNode;
            let end = this.currentAlgorithm.endNode;

            this.grid.initGrid(this.currentAlgorithm.algorithmNode);

            this.currentAlgorithm.setStartNode(this.grid.getNode(start.x, start.y));
            this.currentAlgorithm.setEndNode(this.grid.getNode(end.x, end.y));
            this.currentAlgorithm.setComplete(false);

            this.grid.drawAllNodes();
        }

        createMazeBtn.onclick = () => {
            createMazeBtn.blur();
            let maze = this.mazeBuilder.run();
            this.grid.transferMazeToGrid(maze, this.currentAlgorithm.algorithmNode);
            this.currentAlgorithm.placeStartAndEndInMaze();
            this.currentAlgorithm.setComplete(false);

            this.grid.drawAllNodes();
        }
    }
}