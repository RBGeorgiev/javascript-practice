import { Node } from './nodes.js';
import { GRID_NODE_TYPES, PATHFINDING_ALGORITHMS, PATHFINDING_GRIDS } from './enums.js';
import PathfindingVisualization from './pf-viz.js';
import {
    canvas,
    animSpeedInput,
    animSpeedSpan,
    clearPathBtn,
    clearObstaclesBtn,
    pathfindingAlgorithmSelect,
    runAlgorithmBtn,
    createMazeBtn,
    mazeAlgorithmSelect,
    timerTextSpan,
    timerNumberSpan
} from './constants.js';
import MazeBuilder from '../../maze-builder/src/maze-builder.js';
import { MAZE_ALGORITHMS, MAZE_GRIDS, MAZE_ALGORITHM_NODES } from '../../maze-builder/src/constants.js';

export default class Main {
    constructor(gridWidth = 51) {
        this.gridWidth = gridWidth;

        this.gridClass;
        this.currentAlgorithm;
        this.pathfindingViz;
        this.mazeBuilder;

        this.init(this.gridWidth);
        this.initEventListeners();
        this.initOptions();
    }

    init = (gridWidth) => {
        let pfGrid = PATHFINDING_GRIDS[gridSelect.value];
        let pfAlgorithm = PATHFINDING_ALGORITHMS[pathfindingAlgorithmSelect.value];
        let mazeGrid = MAZE_GRIDS[gridSelect.value];
        let mazeAlgorithm = MAZE_ALGORITHMS[mazeAlgorithmSelect.value];

        this.gridClass = new pfGrid(gridWidth);
        this.gridClass.initGrid(Node);
        this.currentAlgorithm = new pfAlgorithm(this.gridClass);
        this.pathfindingViz = new PathfindingVisualization(this.gridClass);

        this.mazeBuilder = new MazeBuilder(new mazeGrid(null, gridWidth), mazeAlgorithm);

        this.currentAlgorithm.setStartNode(this.gridClass.getNode(10, 8));
        this.currentAlgorithm.setEndNode(this.gridClass.getNode(23, 8));

        this.gridClass.clearCanvas();
        this.gridClass.drawAllNodes();
    }

    changeAlgorithm = (algorithm) => {
        let start = this.currentAlgorithm.startNode;
        let end = this.currentAlgorithm.endNode;

        this.currentAlgorithm = new algorithm(this.gridClass);

        this.currentAlgorithm.setStartNode(this.gridClass.getNode(start.x, start.y));
        this.currentAlgorithm.setEndNode(this.gridClass.getNode(end.x, end.y));

        this.gridClass.drawAllNodes();
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
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY) {
            node.setType(GRID_NODE_TYPES.UNWALKABLE);
            this.gridClass.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    addEmpty = (e) => {
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.UNWALKABLE || node.type === GRID_NODE_TYPES.MUD) {
            node.setType(GRID_NODE_TYPES.EMPTY);
            this.gridClass.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    addMud = (e) => {
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY) {
            node.setType(GRID_NODE_TYPES.MUD);
            this.gridClass.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                this.runCurrentAlgorithm();
            }
        }
    }

    dragStart = (e) => {
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        let oldStart = this.currentAlgorithm.startNode;
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY && oldStart !== node) {
            oldStart.setType(GRID_NODE_TYPES.EMPTY);
            this.gridClass.drawNode(oldStart);

            this.currentAlgorithm.setStartNode(node);
            this.gridClass.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                oldStart.resetPathfindingValues();
                this.runCurrentAlgorithm();
            }
        }
    }

    dragEnd = (e) => {
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        let oldEnd = this.currentAlgorithm.endNode;
        if (node === null) return;
        if (node.type === GRID_NODE_TYPES.EMPTY && oldEnd !== node) {
            oldEnd.setType(GRID_NODE_TYPES.EMPTY);
            this.gridClass.drawNode(oldEnd);

            this.currentAlgorithm.setEndNode(node);
            this.gridClass.drawNode(node);

            if (this.currentAlgorithm.complete === true) {
                oldEnd.resetPathfindingValues();
                this.runCurrentAlgorithm();
            }
        }
    }

    handleMouseDown = (e) => {
        let node = this.gridClass.getNodeFromCanvasCoordinates(e.offsetX, e.offsetY);
        let listener;

        switch (node.type) {
            case GRID_NODE_TYPES.EMPTY:
                if (e.buttons === 1) {
                    listener = this.addUnwalkable;
                    this.addUnwalkable(e);
                    canvas.addEventListener('mousemove', this.addUnwalkable);
                } else if (e.buttons === 2) {
                    listener = this.addMud;
                    this.addMud(e);
                    canvas.addEventListener('mousemove', this.addMud);
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
            this.pathfindingViz.stopAnimFrame();
            timerTextSpan.innerText = "";
            timerNumberSpan.innerText = "";
            this.changeAlgorithm(PATHFINDING_ALGORITHMS[pathfindingAlgorithmSelect.value]);
        }

        mazeAlgorithmSelect.onchange = () => {
            mazeAlgorithmSelect.blur();
            this.mazeBuilder.setAlgorithm(MAZE_ALGORITHMS[mazeAlgorithmSelect.value]);
        }

        gridSelect.onchange = () => {
            gridSelect.blur();
            this.pathfindingViz.stopAnimFrame();
            this.init();
        }

        animSpeedInput.oninput = (e) => {
            animSpeedInput.blur();
            let val = +e.target.value;
            this.pathfindingViz.setAnimSpeed(val);
            animSpeedSpan.innerHTML = val;
        }

        gridSizeInput.oninput = (e) => {
            gridSizeInput.blur();
            let val = +e.target.value;
            this.init(val);
            gridSizeSpan.innerHTML = val;
        }

        clearPathBtn.onclick = () => {
            clearPathBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            this.currentAlgorithm.reset();
            this.currentAlgorithm.setComplete(false);
        }

        clearObstaclesBtn.onclick = () => {
            clearObstaclesBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            let start = this.currentAlgorithm.startNode;
            let end = this.currentAlgorithm.endNode;

            this.gridClass.initGrid(this.currentAlgorithm.algorithmNode);

            this.currentAlgorithm.setStartNode(this.gridClass.getNode(start.x, start.y));
            this.currentAlgorithm.setEndNode(this.gridClass.getNode(end.x, end.y));
            this.currentAlgorithm.setComplete(false);

            this.gridClass.drawAllNodes();
        }

        clearWallsBtn.onclick = () => {
            clearWallsBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            let start = this.currentAlgorithm.startNode;
            let end = this.currentAlgorithm.endNode;

            let callback = (node) => node.type === GRID_NODE_TYPES.UNWALKABLE;

            this.gridClass.transferGridState(this.currentAlgorithm.algorithmNode, callback);

            this.currentAlgorithm.setStartNode(this.gridClass.getNode(start.x, start.y));
            this.currentAlgorithm.setEndNode(this.gridClass.getNode(end.x, end.y));
            this.currentAlgorithm.setComplete(false);

            this.gridClass.drawAllNodes();
        }

        clearMudBtn.onclick = () => {
            clearMudBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            let start = this.currentAlgorithm.startNode;
            let end = this.currentAlgorithm.endNode;

            let callback = (node) => node.type === GRID_NODE_TYPES.MUD;

            this.gridClass.transferGridState(this.currentAlgorithm.algorithmNode, callback);

            this.currentAlgorithm.setStartNode(this.gridClass.getNode(start.x, start.y));
            this.currentAlgorithm.setEndNode(this.gridClass.getNode(end.x, end.y));
            this.currentAlgorithm.setComplete(false);

            this.gridClass.drawAllNodes();
        }

        createMazeBtn.onclick = () => {
            createMazeBtn.blur();
            this.pathfindingViz.stopAnimFrame();
            this.mazeBuilder.gridClass.initGrid(MAZE_ALGORITHM_NODES[mazeAlgorithmSelect.value]);
            let maze = this.mazeBuilder.run();
            this.gridClass.transferMazeToGrid(maze, this.currentAlgorithm.algorithmNode);
            this.currentAlgorithm.placeStartAndEndInMaze();
            this.currentAlgorithm.setComplete(false);

            this.gridClass.drawAllNodes();
        }
    }
}