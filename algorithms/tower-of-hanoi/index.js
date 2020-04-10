import Options from './src/options.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

new Options(ctx);