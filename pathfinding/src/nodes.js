import { GRID_NODE_TYPES } from './enums.js';

export class Node {
    constructor(x, y, type = GRID_NODE_TYPES.EMPTY) {
        this.x = x;
        this.y = y;
        this.parent = null;
        this.heapIdx = null;
        this.type = type;
        this.moveCost = 0;
        this.unwalkable = false;
        this.isEnd = false;
        this.isStart = false;
        this.isHex = false;
        this.hexCenter = null;
        this.hexVertices = null;
        this.setType(type);
    }

    setHeapIdx = (idx) => this.heapIdx = idx;

    setHexCenter = (obj) => this.hexCenter = obj;

    setHexVertices = (arr) => this.hexVertices = arr;

    setIsHex = (bool) => this.isHex = bool;

    setParent = (parent) => this.parent = parent;

    setType = (type) => {
        this.type = type;
        this.moveCost = (type === GRID_NODE_TYPES.MUD) ? 5 : 0;
        this.unwalkable = !!(type === GRID_NODE_TYPES.UNWALKABLE);
        this.isEnd = !!(type === GRID_NODE_TYPES.END);
        this.isStart = !!(type === GRID_NODE_TYPES.START);
    }
}

export class AStarNode extends Node {
    constructor(x, y, type) {
        super(x, y, type);
        this.gCost = null;
        this.hCost = null;
        this.closed = false;
    }

    getFCost = () => this.gCost + this.hCost;

    resetPathfindingValues = () => {
        this.setGCost(null);
        this.setHCost(null);
        this.setParent(null);
        this.setHeapIdx(null);
        this.setClosed(false);
    }

    setClosed = (bool = true) => this.closed = bool;

    setGCost = (val) => this.gCost = val;

    setHCost = (val) => this.hCost = val;
}

export class DijkstraNode extends Node {
    constructor(x, y, type) {
        super(x, y, type);
        this.dist = Infinity;
        this.visited = false;
    }

    getDist = () => this.dist;

    resetPathfindingValues = () => {
        this.setDist(Infinity);
        this.setParent(null);
        this.setHeapIdx(null);
        this.setVisited(false);
    }

    setDist = (val) => this.dist = val;

    setVisited = (bool) => this.visited = bool;
}
