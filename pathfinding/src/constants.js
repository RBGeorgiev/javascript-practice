const el = (id) => document.getElementById(id);

export const canvas = el("canvas");
export const ctx = canvas.getContext("2d");
export const gridSelect = el('gridSelect');
export const animSpeedInput = el('animSpeedInput');
export const animSpeedSpan = el('animSpeedSpan');
export const gridSizeInput = el('gridSizeInput');
export const gridSizeSpan = el('gridSizeSpan');
export const clearPathBtn = el('clearPathBtn');
export const clearObstaclesBtn = el('clearObstaclesBtn');
export const clearWallsBtn = el('clearWallsBtn');
export const clearMudBtn = el('clearMudBtn');
export const pathfindingAlgorithmSelect = el('pathfindingAlgorithmSelect');
export const runAlgorithmBtn = el('runAlgorithmBtn');
export const createMazeBtn = el('createMazeBtn');
export const mazeAlgorithmSelect = el('mazeAlgorithmSelect');
export const timerTextSpan = el('timerTextSpan');
export const timerNumberSpan = el('timerNumberSpan');