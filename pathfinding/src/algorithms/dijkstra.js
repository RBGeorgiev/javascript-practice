import MinHeap from '../min-heap.js';
import { DijkstraNode } from '../nodes.js';
import { GRID_NODE_TYPES, PF_NODE_TYPES } from '../enums.js';

export default class Dijkstra {
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
        let width = this.grid.length;

        for (let x = 0; x < width; x++) {
            let height = this.grid[x].length;
            for (let y = 0; y < height; y++) {
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
                    if (!curNode.isHex) {
                        let blocked = this.isDiagonalBlocked(curNode, adjNode);
                        if (blocked) continue;
                    }
                    newDist = curNode.dist + 14 + adjNode.moveCost;
                } else {
                    newDist = curNode.dist + 10 + adjNode.moveCost;
                }

                if (newDist < adjNode.dist) {
                    adjNode.setDist(newDist);
                    adjNode.setParent(curNode);
                    this.unvisitedList.update(adjNode.heapIdx);
                    this.addToStepsTaken(adjNode, PF_NODE_TYPES.OPEN_LIST);
                }
            }

            curNode.setVisited(true);
            this.addToStepsTaken(curNode, PF_NODE_TYPES.CLOSED_LIST);
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

            this.addToStepsTaken(curNode, PF_NODE_TYPES.PATH);

            if (curNode.type === GRID_NODE_TYPES.START) {
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
        if (newStartNode.type === GRID_NODE_TYPES.EMPTY) {
            this.setStartNode(newStartNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newStartNode);
            for (let adj of neighbors) {
                if (adj.type === GRID_NODE_TYPES.EMPTY) {
                    this.setStartNode(adj);
                    break;
                }
            }
        }

        let newEndNode = this.gridClass.getNode(endX, endY);
        if (newEndNode.type === GRID_NODE_TYPES.EMPTY) {
            this.setEndNode(newEndNode);
        } else {
            let neighbors = this.gridClass.getNeighbors(newEndNode);
            for (let adj of neighbors) {
                if (adj.type === GRID_NODE_TYPES.EMPTY) {
                    this.setEndNode(adj);
                    break;
                }
            }
        }
    }

    reset = () => {
        let gridWidth = this.grid.length;

        for (let x = 0; x < gridWidth; x++) {
            let gridHeight = this.grid[x].length;
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
        node.setType(GRID_NODE_TYPES.END);
        this.endNode = node;
    }

    setStartNode = (node) => {
        node.setType(GRID_NODE_TYPES.START);
        node.setDist(0);
        this.startNode = node;
    }
}