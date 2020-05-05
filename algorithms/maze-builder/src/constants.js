import RecursiveBacktracking from './algorithms/recursive-backtracking.js';
import Kruskal from './algorithms/kruskal.js';
import Eller from './algorithms/eller.js';
import SquareGrid from './square-grid.js';
import HexGrid from './hex-grid.js';

const el = (id) => document.getElementById(id);

export const canvas = el("canvas");
export const ctx = canvas.getContext("2d");
export const createMazeBtn = el("createMazeBtn");
export const algorithmSelect = el('algorithmSelect');
export const timerNumberSpan = el('timerNumberSpan');

export const MAZE_VIZ_TYPE = {
    PATH: "#FFFFFF",
    TRACEBACK: "#FF0000"
}

export const MAZE_ALGORITHMS = {
    'RecursiveBacktracking': RecursiveBacktracking,
    'Kruskal': Kruskal,
    'Eller': Eller
}
Object.freeze(MAZE_ALGORITHMS);

export const MAZE_GRIDS = {
    'squareGrid': SquareGrid,
    'hexGrid': HexGrid
}
Object.freeze(MAZE_GRIDS);