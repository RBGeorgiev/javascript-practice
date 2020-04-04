import MazeBuilder from './maze-builder.js';
import { MazeBuilderVisualization } from './maze-builder-viz.js';
import { MAZE_ALGORITHMS, ctx, createMazeBtn, algorithmSelect, timerNumberSpan } from './constants.js';

export default class Options {
    constructor(sizeX = 50, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);
        this.mazeBuilder = new MazeBuilder(this.gridSizeX, this.gridSizeY, MAZE_ALGORITHMS[algorithmSelect.value]);
        this.mazeBuilderViz = new MazeBuilderVisualization(this.mazeBuilder, ctx);
        this.mazeBuilderViz.initViz();
        this.initEventListeners();
    }

    initEventListeners = () => {
        createMazeBtn.onclick = () => {
            this.mazeBuilderViz.stopAnimFrame();

            let timeStart = window.performance.now();
            this.mazeBuilderViz.buildMaze();
            let timeEnd = window.performance.now();

            let timeTaken = timeEnd - timeStart;
            this.displayTime(timeTaken);

            let stepsTaken = this.mazeBuilder.getStepsTaken();
            this.mazeBuilderViz.animateSteps(stepsTaken);
        }

        algorithmSelect.onchange = () => {
            algorithmSelect.blur();
            this.mazeBuilderViz.changeAlgorithm(MAZE_ALGORITHMS[algorithmSelect.value]);
        }
    }

    displayTime = (timeTaken) => {
        let time = Math.round((timeTaken + Number.EPSILON) * 100) / 100;
        let displayStr = `${algorithmSelect.value}: ${time}ms`;
        timerNumberSpan.innerText = displayStr;
        console.log(displayStr, `(${timeTaken})`);
    }
}