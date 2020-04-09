import MazeBuilder from '../maze-builder/src/maze-builder.js';
import { MAZE_ALGORITHMS } from '../maze-builder/src/constants.js';
import { NODE_TYPES, ASTAR_TYPES, ASTAR_COLORS } from './enums.js';
import { canvas, ctx, animSpeedInput, animSpeedSpan, clearPathBtn, clearWallsBtn, pathfindingAlgorithmSelect, runAlgorithmBtn, createMazeBtn, mazeAlgorithmSelect, timerTextSpan, timerNumberSpan } from './constants.js';
import { AStarNode, DijkstraNode } from './nodes.js';
import MinHeap from './min-heap.js';
import Grid from './grid.js';

// ___________________________________________________________________

canvas.oncontextmenu = () => false;

canvas.width = 1600;
canvas.height = 800;


class AStar {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.algorithmNode = AStarNode;
        this.gridClass.transferGridState(this.algorithmNode);
        this.grid = gridClass.grid;
        this.startNode = null;
        this.endNode = null;
        this.openList = new MinHeap(this.scoreFunction);
        this.complete = false;

        this.stepsTaken = [];
    }

    addToClosedList = (node) => {
        node.setClosed(true);
        this.addToStepsTaken(node, ASTAR_TYPES.CLOSED_LIST);
    }

    addToOpenList = (node) => {
        this.openList.add(node);
        this.addToStepsTaken(node, ASTAR_TYPES.OPEN_LIST);
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    calcCost = (nodeA, nodeB) => {
        let distX = Math.abs(nodeA.x - nodeB.x);
        let distY = Math.abs(nodeA.y - nodeB.y);

        if (distX > distY) {
            return 14 * distY + 10 * (distX - distY);
        }
        return 14 * distX + 10 * (distY - distX);
    }

    findPath = () => {
        this.addToOpenList(this.startNode);

        while (this.openList.size() > 0) {
            let curNode = this.openList.popMin();

            this.addToClosedList(curNode);

            let neighbors = this.gridClass.getNeighbors(curNode);

            for (let i = 0; i < neighbors.length; i++) {
                let adjNode = neighbors[i];

                if (adjNode.unwalkable || adjNode.closed) {
                    continue;
                }

                if (curNode.x - adjNode.x !== 0 && curNode.y - adjNode.y !== 0) {
                    let blocked = this.isDiagonalBlocked(curNode, adjNode);
                    if (blocked) continue;
                }

                if (adjNode.isEnd) {
                    adjNode.setParent(curNode);
                    this.getPath(adjNode);
                    return true;
                }

                let newAdjNodeGCost = curNode.gCost + this.calcCost(curNode, adjNode) + adjNode.moveCost;
                let adjNotInOpenList = !!(adjNode.gCost === null);

                if (newAdjNodeGCost < adjNode.gCost || adjNotInOpenList) {
                    let hCost = this.calcCost(adjNode, this.endNode);
                    adjNode.setGCost(newAdjNodeGCost);
                    adjNode.setHCost(hCost);
                    adjNode.setParent(curNode);

                    if (adjNotInOpenList) {
                        this.addToOpenList(adjNode);
                    } else {
                        this.openList.update(adjNode.heapIdx);
                    }
                }
            }
        }

        return false;
    }

    getPath = (endNode) => {
        let path = [];
        let curNode = endNode;

        while (true) {
            path.unshift(curNode);

            this.addToStepsTaken(curNode, ASTAR_TYPES.PATH);

            if (curNode.type === NODE_TYPES.START) {
                return path;
            }

            curNode = curNode.parent;
        }
    }

    getStepsTaken = () => this.stepsTaken;

    isDiagonalBlocked = (curNode, adjNode) => {
        let sideNodeX = this.gridClass.getNode(adjNode.x, curNode.y);
        let sideNodeY = this.gridClass.getNode(curNode.x, adjNode.y);

        return !!(sideNodeX.unwalkable && sideNodeY.unwalkable);
    }

    placeStartAndEndInMaze = () => {
        let [startX, startY] = [this.startNode.x, this.startNode.y];
        let [endX, endY] = [this.endNode.x, this.endNode.y];

        let newStartNode = this.gridClass.getNode(startX, startY);
        if (newStartNode.type === NODE_TYPES.EMPTY) {
            this.setStartNode(newStartNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newStartNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setStartNode(adj);
                    break;
                }
            }
        }

        let newEndNode = this.gridClass.getNode(endX, endY);
        if (newEndNode.type === NODE_TYPES.EMPTY) {
            this.setEndNode(newEndNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newEndNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setEndNode(adj);
                    break;
                }
            }
        }
    }

    reset = () => {
        let gridWidth = this.gridClass.gridSizeX;
        let gridHeight = this.gridClass.gridSizeY;

        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                let node = this.gridClass.getNode(x, y);
                if (node.gCost === null) continue;
                this.gridClass.drawNode(node);
                node.resetPathfindingValues();
            }
        }
        this.gridClass.drawNode(this.startNode);
        this.gridClass.drawNode(this.endNode);

        this.openList.reset();

        this.stepsTaken = [];
    }

    run = () => {
        this.reset();
        return this.findPath();
    }

    scoreFunction = (node) => node.getFCost();

    setComplete = (bool) => this.complete = bool;

    setEndNode = (node) => {
        node.setType(NODE_TYPES.END);
        this.endNode = node;
    }

    setStartNode = (node) => {
        node.setType(NODE_TYPES.START);
        this.startNode = node;
    }
}

class Dijkstra {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.algorithmNode = DijkstraNode;
        this.gridClass.transferGridState(this.algorithmNode);
        this.grid = gridClass.grid;
        this.startNode = null;
        this.endNode = null;
        this.unvisitedList = new MinHeap(this.scoreFunction);
        this.complete = false;

        this.stepsTaken = [];
    }

    addToStepsTaken = (node, type) => {
        let step = {
            node: node,
            type: type
        };
        this.stepsTaken.push(step);
    }

    findPath = () => {
        for (let x = 0; x < this.gridClass.gridSizeX; x++) {
            for (let y = 0; y < this.gridClass.gridSizeY; y++) {
                let node = this.gridClass.getNode(x, y);
                this.unvisitedList.add(node);
            }
        }

        let curNode;
        while (true) {
            curNode = this.unvisitedList.popMin();

            if (curNode.dist === Infinity) {
                return false;
            }

            let neighbors = this.gridClass.getNeighbors(curNode);
            for (let adjNode of neighbors) {
                if (adjNode.visited || adjNode.unwalkable) continue;

                let newDist;

                if (adjNode.x - curNode.x !== 0 && adjNode.y - curNode.y !== 0) {
                    let blocked = this.isDiagonalBlocked(curNode, adjNode);
                    if (blocked) continue;
                    newDist = curNode.dist + 14 + adjNode.moveCost;
                } else {
                    newDist = curNode.dist + 10 + adjNode.moveCost;
                }

                if (newDist < adjNode.dist) {
                    adjNode.setDist(newDist);
                    adjNode.setParent(curNode);
                    this.unvisitedList.update(adjNode.heapIdx);
                    this.addToStepsTaken(adjNode, ASTAR_TYPES.OPEN_LIST);
                }
            }

            curNode.setVisited(true);
            this.addToStepsTaken(curNode, ASTAR_TYPES.CLOSED_LIST);
            if (curNode.isEnd) {
                this.getPath(curNode);
                return true;
            }
        }

    }

    getPath = (endNode) => {
        let path = [];
        let curNode = endNode;

        while (true) {
            path.unshift(curNode);

            this.addToStepsTaken(curNode, ASTAR_TYPES.PATH);

            if (curNode.type === NODE_TYPES.START) {
                return path;
            }

            curNode = curNode.parent;
        }
    }

    getStepsTaken = () => this.stepsTaken;

    isDiagonalBlocked = (curNode, adjNode) => {
        let sideNodeX = this.gridClass.getNode(adjNode.x, curNode.y);
        let sideNodeY = this.gridClass.getNode(curNode.x, adjNode.y);

        return !!(sideNodeX.unwalkable && sideNodeY.unwalkable);
    }

    placeStartAndEndInMaze = () => {
        let [startX, startY] = [this.startNode.x, this.startNode.y];
        let [endX, endY] = [this.endNode.x, this.endNode.y];

        let newStartNode = this.gridClass.getNode(startX, startY);
        if (newStartNode.type === NODE_TYPES.EMPTY) {
            this.setStartNode(newStartNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newStartNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setStartNode(adj);
                    break;
                }
            }
        }

        let newEndNode = this.gridClass.getNode(endX, endY);
        if (newEndNode.type === NODE_TYPES.EMPTY) {
            this.setEndNode(newEndNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newEndNode);
            for (let adj of neighbors) {
                if (adj.type === NODE_TYPES.EMPTY) {
                    this.setEndNode(adj);
                    break;
                }
            }
        }
    }

    reset = () => {
        let gridWidth = this.gridClass.gridSizeX;
        let gridHeight = this.gridClass.gridSizeY;

        for (let x = 0; x < gridWidth; x++) {
            for (let y = 0; y < gridHeight; y++) {
                let node = this.gridClass.getNode(x, y);
                if (node.dist === Infinity) continue;
                this.gridClass.drawNode(node);
                node.resetPathfindingValues();
            }
        }
        this.startNode.setDist(0);
        this.gridClass.drawNode(this.startNode);
        this.gridClass.drawNode(this.endNode);

        this.unvisitedList.reset();

        this.stepsTaken = [];
    }

    run = () => {
        this.reset();
        return this.findPath();
    }

    scoreFunction = (node) => node.getDist();

    setComplete = (bool) => this.complete = bool;

    setEndNode = (node) => {
        node.setType(NODE_TYPES.END);
        this.endNode = node;
    }

    setStartNode = (node) => {
        node.setType(NODE_TYPES.START);
        node.setDist(0);
        this.startNode = node;
    }
}

class PathfindingVisualization {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = gridClass.grid;
        this.animFrameId = null;
        this.animSpeed = +animSpeedInput.value;
    }

    setAnimSpeed = (val) => this.animSpeed = val;

    animateSteps = (stepsTaken) => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = stepsTaken.length;

        let timeout, j, speed;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i >= len - 1) return;

            speed = this.animSpeed;

            timeout = deltaTime / speed;
            j = 0;

            while (j < speed) {
                setTimeout(this.visualizeStep(stepsTaken, i + j), timeout * j)
                j++;
            }

            i += speed;

            this.setAnimFrameId(
                window.requestAnimationFrame(step)
            );
        }

        this.setAnimFrameId(
            window.requestAnimationFrame(step)
        );
    }

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    visualizationController = (stepsTaken, complete) => (complete) ? this.drawSteps(stepsTaken) : this.animateSteps(stepsTaken);

    visualizeStep = (stepsTaken, idx) => {
        if (idx >= stepsTaken.length - 1) return;

        let curNode = stepsTaken[idx].node;
        let curType = stepsTaken[idx].type;

        if (curType === ASTAR_TYPES.PATH) {
            let nextNode = stepsTaken[idx + 1].node;
            this.drawPath(curNode, nextNode);
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
        else {
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
    }

    setAnimFrameId = (id) => this.animFrameId = id;

    drawPath = (nodeA, nodeB) => {
        let size = this.gridClass.nodeSize;
        let aX = size * nodeA.x + size / 2;
        let aY = size * nodeA.y + size / 2;
        let bX = size * nodeB.x + size / 2;
        let bY = size * nodeB.y + size / 2;

        ctx.strokeStyle = ASTAR_COLORS.PATH;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
    }

    drawPathfindingNode = (node, color) => {
        if (node.isStart || node.isEnd) return;
        let size = this.gridClass.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;

        ctx.beginPath();

        ctx.fillStyle = color;

        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        if (color === ASTAR_COLORS.CLOSED_LIST || color === ASTAR_COLORS.PATH) {
            ctx.arc(xPos + size / 2, yPos + size / 2, size / 3, 0, 2 * Math.PI);
        } else {
            ctx.rect(xPos + size / 4, yPos + size / 4, size / 2, size / 2);
        }

        ctx.fill();
        ctx.stroke();
    }

    drawSteps = (stepsTaken) => {
        let len = stepsTaken.length;
        for (let i = 0; i < len; i++) {
            this.visualizeStep(stepsTaken, i);
        }
    }
}

const PATHFINDING_ALGORITHMS = {
    'AStar': AStar,
    'Dijkstra': Dijkstra
}
Object.freeze(PATHFINDING_ALGORITHMS);

const start = (gridWidth) => {
    grid = new Grid(gridWidth);
    grid.initGrid(AStarNode);

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