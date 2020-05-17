import RecursiveBacktracking from './algorithms/recursive-backtracking.js';
import Kruskal from './algorithms/kruskal.js';
import Eller from './algorithms/eller.js';
import Prim from './algorithms/prim.js';
import RecursiveDivision from './algorithms/recursive-division.js';
import { RecBacktrNode, RecDivNode, KruskalNode, EllerNode, PrimNode } from './nodes.js';
import SquareGrid from './square-grid.js';
import HexGrid from './hex-grid.js';

const el = (id) => document.getElementById(id);

export const canvas = el("canvas");
export const ctx = canvas.getContext("2d");
export const createMazeBtn = el("createMazeBtn");
export const algorithmSelect = el('algorithmSelect');
export const timerSpan = el('timerSpan');

export const MAZE_VIZ_TYPE = {
    WALL: "#000000",
    PATH: "#FFFFFF",
    TRACEBACK: "#FF0000"
}

export const MAZE_ALGORITHMS = {
    'RecursiveBacktracking': RecursiveBacktracking,
    'RecursiveDivision': RecursiveDivision,
    'Kruskal': Kruskal,
    'Eller': Eller,
    'Prim': Prim
}
Object.freeze(MAZE_ALGORITHMS);

export const MAZE_ALGORITHM_NODES = {
    'RecursiveBacktracking': RecBacktrNode,
    'RecursiveDivision': RecDivNode,
    'Kruskal': KruskalNode,
    'Eller': EllerNode,
    'Prim': PrimNode
}
Object.freeze(MAZE_ALGORITHM_NODES);

export const MAZE_GRIDS = {
    'squareGrid': SquareGrid,
    'hexGrid': HexGrid
}
Object.freeze(MAZE_GRIDS);