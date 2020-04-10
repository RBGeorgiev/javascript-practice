import Grid from './grid.js'
import { Node } from './nodes.js';
import { NODE_TYPES, PATHFINDING_ALGORITHMS } from './enums.js';
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
import MazeBuilder from '../maze-builder/src/maze-builder.js';
import { MAZE_ALGORITHMS } from '../maze-builder/src/constants.js';

// ___________________________________________________________________

canvas.oncontextmenu = () => false;

canvas.width = 1600;
canvas.height = 800;


const start = (gridWidth) => {
    grid = new Grid(gridWidth);
    grid.initGrid(Node);

    currentAlgorithm = new AStar(grid);
    currentAlgorithm.setStartNode(grid.getNode(10, 8));
    currentAlgorithm.setEndNode(grid.getNode(23, 8));
    pathfindingViz = new PathfindingVisualization(grid);
    mazeBuilder = new MazeBuilder(grid.gridSizeX, grid.gridSizeY, MAZE_ALGORITHMS[mazeAlgorithmSelect.value]);

    grid.drawAllNodes();
}

let grid, currentAlgorithm, pathfindingViz, mazeBuilder;
let gridWidth = 50;
start(gridWidth);


const changeAlgorithm = (algorithm) => {
    pathfindingViz.stopAnimFrame();

    let start = currentAlgorithm.startNode;
    let end = currentAlgorithm.endNode;

    currentAlgorithm = new algorithm(grid);

    currentAlgorithm.setStartNode(grid.getNode(start.x, start.y));
    currentAlgorithm.setEndNode(grid.getNode(end.x, end.y));

    grid.drawAllNodes();
}

const displayTimeInHTML = (timeTaken, pathFoundBool) => {
    let time = Math.round((timeTaken + Number.EPSILON) * 100) / 100;
    let displayStr = `${pathfindingAlgorithmSelect.value}: ${time}ms`;
    timerTextSpan.innerText = (pathFoundBool) ? "Path found:" : "Path doesn't exist:";
    timerNumberSpan.innerText = displayStr;
    console.log(displayStr, `(${timeTaken})`);
}

const runCurrentAlgorithm = () => {
    let timeStart = window.performance.now();
    let pathFoundBool = currentAlgorithm.run();
    let timeEnd = window.performance.now();

    let timeTaken = timeEnd - timeStart;
    displayTimeInHTML(timeTaken, pathFoundBool);

    let stepsTaken = currentAlgorithm.getStepsTaken();
    pathfindingViz.visualizationController(stepsTaken, currentAlgorithm.complete);
}

const addUnwalkable = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.UNWALKABLE);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            runCurrentAlgorithm();
        }
    }
}

const addEmpty = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.UNWALKABLE || node.type === NODE_TYPES.SWAMP) {
        node.setType(NODE_TYPES.EMPTY);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            runCurrentAlgorithm();
        }
    }
}

const addSwamp = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY) {
        node.setType(NODE_TYPES.SWAMP);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            runCurrentAlgorithm();
        }
    }
}

const dragStart = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldStart = currentAlgorithm.startNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldStart !== node) {
        oldStart.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldStart);

        currentAlgorithm.setStartNode(node);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            oldStart.resetPathfindingValues();
            runCurrentAlgorithm();
        }
    }
}

const dragEnd = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let oldEnd = currentAlgorithm.endNode;
    if (node === null) return;
    if (node.type === NODE_TYPES.EMPTY && oldEnd !== node) {
        oldEnd.setType(NODE_TYPES.EMPTY);
        grid.drawNode(oldEnd);

        currentAlgorithm.setEndNode(node);
        grid.drawNode(node);

        if (currentAlgorithm.complete === true) {
            oldEnd.resetPathfindingValues();
            runCurrentAlgorithm();
        }
    }
}

const handleMouseDown = (e) => {
    let node = grid.getNodeFromCoordinates(e.offsetX, e.offsetY);
    let listener;

    switch (node.type) {
        case NODE_TYPES.EMPTY:
            if (e.buttons === 1) {
                listener = addUnwalkable;
                addUnwalkable(e);
                canvas.addEventListener('mousemove', addUnwalkable);
            } else if (e.buttons === 2) {
                listener = addSwamp;
                addSwamp(e);
                canvas.addEventListener('mousemove', addSwamp);
            }
            break;

        case NODE_TYPES.START:
            listener = dragStart;
            canvas.addEventListener('mousemove', dragStart);
            break;

        case NODE_TYPES.END:
            listener = dragEnd;
            canvas.addEventListener('mousemove', dragEnd);
            break;

        default:
            listener = addEmpty;
            addEmpty(e);
            canvas.addEventListener('mousemove', addEmpty);
    }

    canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', listener));
}

canvas.addEventListener('mousedown', (e) => {
    pathfindingViz.stopAnimFrame();
    handleMouseDown(e)
});

document.addEventListener('keydown', (e) => {
    // Space and Enter
    if (e.keyCode === 13 || e.keyCode === 32) {
        pathfindingViz.stopAnimFrame();
        currentAlgorithm.setComplete(false);
        runCurrentAlgorithm();
        currentAlgorithm.setComplete(true);
    }
});


// ___________________________________________________
// Options

runAlgorithmBtn.onclick = () => {
    runAlgorithmBtn.blur();
    pathfindingViz.stopAnimFrame();
    currentAlgorithm.setComplete(false);
    runCurrentAlgorithm();
    currentAlgorithm.setComplete(true);
}

pathfindingAlgorithmSelect.onchange = () => {
    pathfindingAlgorithmSelect.blur();
    timerTextSpan.innerText = "";
    timerNumberSpan.innerText = "";
    changeAlgorithm(PATHFINDING_ALGORITHMS[pathfindingAlgorithmSelect.value]);
}

mazeAlgorithmSelect.onchange = () => {
    mazeAlgorithmSelect.blur();
    mazeBuilder.setAlgorithm(MAZE_ALGORITHMS[mazeAlgorithmSelect.value]);
}

animSpeedInput.oninput = (e) => {
    animSpeedInput.blur();
    let val = +e.target.value;
    pathfindingViz.setAnimSpeed(val);
    animSpeedSpan.innerHTML = val;
}

clearPathBtn.onclick = () => {
    clearPathBtn.blur();
    currentAlgorithm.reset();
    currentAlgorithm.setComplete(false);
}

clearWallsBtn.onclick = () => {
    clearWallsBtn.blur();
    let start = currentAlgorithm.startNode;
    let end = currentAlgorithm.endNode;

    grid.initGrid(currentAlgorithm.algorithmNode);

    currentAlgorithm.setStartNode(grid.getNode(start.x, start.y));
    currentAlgorithm.setEndNode(grid.getNode(end.x, end.y));
    currentAlgorithm.setComplete(false);

    grid.drawAllNodes();
}

createMazeBtn.onclick = () => {
    createMazeBtn.blur();
    let maze = mazeBuilder.run();
    grid.transferMazeToGrid(maze, currentAlgorithm.algorithmNode);
    currentAlgorithm.placeStartAndEndInMaze();
    currentAlgorithm.setComplete(false);

    grid.drawAllNodes();
}