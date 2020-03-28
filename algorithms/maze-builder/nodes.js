export class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isMazePath = false;
    }

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
    }

    getRoot = () => this.parent ? this.parent.getRoot() : this;

    connect = (node) => {
        let root = node.getRoot();
        root.parent = this;
    }
}