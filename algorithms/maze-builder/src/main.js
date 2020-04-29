// import Grid from './grid.js';
import Grid from './hex-grid.js';
import { Node } from './nodes.js';
import MazeBuilder from './maze-builder.js';
import { MazeBuilderVisualization } from './maze-builder-viz.js';
import { MAZE_ALGORITHMS, ctx, createMazeBtn, algorithmSelect, timerNumberSpan } from './constants.js';

export default class Main {
    constructor(gridWidth = 51) {
        this.gridClass = new Grid(ctx, gridWidth);
        this.gridClass.reset(Node);

        this.mazeBuilder = new MazeBuilder(this.gridClass, MAZE_ALGORITHMS[algorithmSelect.value]);
        this.mazeBuilderViz = new MazeBuilderVisualization(this.gridClass, this.mazeBuilder, ctx);
        this.initEventListeners();
    }

    initEventListeners = () => {
        createMazeBtn.onclick = () => {
            this.mazeBuilderViz.stopAnimFrame();
            // remove old maze and display black grid
            this.gridClass.reset(Node);

            let timeStart = window.performance.now();
            this.mazeBuilder.run();
            let timeEnd = window.performance.now();

            let timeTaken = timeEnd - timeStart;
            this.displayTime(timeTaken);

            let stepsTaken = this.mazeBuilder.getStepsTaken();
            this.mazeBuilderViz.animateSteps(stepsTaken);
        }

        algorithmSelect.onchange = () => {
            algorithmSelect.blur();
            this.mazeBuilderViz.stopAnimFrame();
            this.mazeBuilder.setAlgorithm(MAZE_ALGORITHMS[algorithmSelect.value]);
            this.gridClass.drawAllNodes();
        }
    }

    displayTime = (timeTaken) => {
        let time = Math.round((timeTaken + Number.EPSILON) * 100) / 100;
        let displayStr = `${algorithmSelect.value}: ${time}ms`;
        timerNumberSpan.innerText = displayStr;
        console.log(displayStr, `(${timeTaken})`);
    }
}