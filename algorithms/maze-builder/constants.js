import { RecursiveBacktracking, Kruskal } from './algorithms.js';

const el = (id) => document.getElementById(id);

export const canvas = el("canvas");
export const ctx = canvas.getContext("2d");
export const createMazeBtn = el("createMazeBtn");
export const algorithmSelect = el('algorithmSelect');
export const timerNumberSpan = el('timerNumberSpan');

export const MAZE_ALGORITHMS = {
    'RecursiveBacktracking': RecursiveBacktracking,
    'Kruskal': Kruskal
}
Object.freeze(MAZE_ALGORITHMS);
