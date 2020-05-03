import { AStar, Dijkstra } from './pf.js';
import SquareGrid from './grid.js';
import HexGrid from './hex-grid.js';

export const GRID_NODE_TYPES = {
    EMPTY: "EMPTY",
    UNWALKABLE: 'UNWALKABLE',
    SWAMP: "SWAMP",
    START: "START",
    END: "END"
}
Object.freeze(GRID_NODE_TYPES);

export const GRID_NODE_COLORS = {
    EMPTY: "#FFFFFF",
    UNWALKABLE: "#000000",
    SWAMP: "#778899",
    START: "#00FF00",
    END: "#FF0000"
}
Object.freeze(GRID_NODE_COLORS);

export const PF_NODE_TYPES = {
    PATH: "PATH",
    OPEN_LIST: "OPEN_LIST",
    CLOSED_LIST: "CLOSED_LIST"
}
Object.freeze(PF_NODE_TYPES);

export const PF_NODE_COLORS = {
    PATH: "#FFA500",
    OPEN_LIST: "#00CDCD",
    CLOSED_LIST: "#0000FF"
}
Object.freeze(PF_NODE_COLORS);

export const PATHFINDING_ALGORITHMS = {
    'AStar': AStar,
    'Dijkstra': Dijkstra
}
Object.freeze(PATHFINDING_ALGORITHMS);

export const PATHFINDING_GRIDS = {
    'squareGrid': SquareGrid,
    'hexGrid': HexGrid
}
Object.freeze(PATHFINDING_GRIDS);