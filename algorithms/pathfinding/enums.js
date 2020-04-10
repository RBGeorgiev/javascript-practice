import { AStar, Dijkstra } from './pf.js';

export const NODE_COLORS = {
    EMPTY: "#FFFFFF",
    UNWALKABLE: "#000000",
    SWAMP: "#CCC769",
    START: "#00FF00",
    END: "#FF0000"
}
Object.freeze(NODE_COLORS);

export const NODE_TYPES = {
    EMPTY: "EMPTY",
    UNWALKABLE: 'UNWALKABLE',
    SWAMP: "SWAMP",
    START: "START",
    END: "END"
}
Object.freeze(NODE_TYPES);

export const ASTAR_TYPES = {
    PATH: "PATH",
    OPEN_LIST: "OPEN_LIST",
    CLOSED_LIST: "CLOSED_LIST"
}
Object.freeze(ASTAR_TYPES);

export const ASTAR_COLORS = {
    PATH: "#FFA500",
    OPEN_LIST: "#00CDCD",
    CLOSED_LIST: "#0000FF"
}
Object.freeze(ASTAR_COLORS);

export const PATHFINDING_ALGORITHMS = {
    'AStar': AStar,
    'Dijkstra': Dijkstra
}
Object.freeze(PATHFINDING_ALGORITHMS);