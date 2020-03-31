import MazeBuilder from './maze-builder.js';
import { MazeBuilderVisualization } from './maze-builder-viz.js';
import MAZE_ALGORITHMS from './algorithms-enum.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let createMazeBtn = document.getElementById("createMazeBtn");
let algorithmSelect = document.getElementById('algorithmSelect');

canvas.width = 1600;
canvas.height = 800;

let gridSizeX = 50;
let mazeBuilder = new MazeBuilder(gridSizeX);
let mazeBuilderViz = new MazeBuilderVisualization(mazeBuilder, ctx);
mazeBuilderViz.initViz();
initEventListeners();

function initEventListeners() {
    createMazeBtn.onclick = () => {
        mazeBuilderViz.stopAnimFrame();
        mazeBuilderViz.buildMaze();
        let stepsTaken = mazeBuilder.getStepsTaken();
        mazeBuilderViz.animateSteps(stepsTaken);
    }

    algorithmSelect.onchange = () => {
        algorithmSelect.blur();
        mazeBuilderViz.changeAlgorithm(MAZE_ALGORITHMS[algorithmSelect.value]);
    }
}