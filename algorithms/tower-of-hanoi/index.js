import Options from './src/options.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 600;

new Options(ctx);