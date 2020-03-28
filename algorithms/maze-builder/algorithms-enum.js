import { RecursiveBacktracking, Kruskal } from './algorithms.js';

const MAZE_ALGORITHMS = {
    'RecursiveBacktracking': RecursiveBacktracking,
    'Kruskal': Kruskal
}
Object.freeze(MAZE_ALGORITHMS);

export default MAZE_ALGORITHMS;