import MazeBuilder from './maze-builder.js';
import { MazeBuilderVisualization } from './algorithms-viz.js';

// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
let createMazeBtn = document.getElementById("createMazeBtn");
let algorithmSelect = document.getElementById('algorithmSelect');

canvas.width = 1600;
canvas.height = 800;

let gridSizeX = 50;
let mazeBuilder = new MazeBuilder(gridSizeX);
let mazeBuilderViz = new MazeBuilderVisualization(mazeBuilder);
mazeBuilderViz.initViz();
mazeBuilderViz.initEventListeners();