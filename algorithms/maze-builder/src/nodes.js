export class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isMazePath = false;

        this.isHex = false;
        this.hexCenter = null;
        this.hexVertices = null;
    }

    setHexCenter = (obj) => this.hexCenter = obj;

    setHexVertices = (arr) => this.hexVertices = arr;

    setIsHex = (bool) => this.isHex = bool;

    setIsMazePath = (bool) => this.isMazePath = bool;

}

export class RecBacktrNode extends Node {
    constructor(x, y) {
        super(x, y);
        this.cellVisited = false;
        this.numOfNeighborCells = undefined;
    }

    setCellVisited = (bool) => this.cellVisited = bool;

    setNumOfNeighborCells = (num) => this.numOfNeighborCells = num;
}

export class KruskalNode extends Node {
    constructor(x, y) {
        super(x, y);
        this.parent = null;
        this.isKruskalCell = false;
    }

    connect = (node) => {
        let root = node.getRoot();
        root.parent = this;
    }

    getRoot = () => this.parent ? this.parent.getRoot() : this;

    setIsKruskalCell = (bool) => this.isKruskalCell = bool;
}

export class EllerNode extends Node {
    constructor(x, y) {
        super(x, y);
        this.parent = null;
    }

    connect = (node) => {
        let root = node.getRoot();
        root.parent = this;
    }

    getRoot = () => this.parent ? this.parent.getRoot() : this;
}

export class PrimNode extends Node {
    constructor(x, y) {
        super(x, y);
        this.cellVisited = false;
        this.inFrontier = false;
        this.parent = false;

    }

    setCellVisited = (bool) => this.cellVisited = bool;

    setInFrontier = (bool) => this.inFrontier = bool;

    setParent = (node) => this.parent = node;
}