import { GridViz } from './algorithms-viz.js';
import { RecursiveBacktracking, Kruskal } from './algorithms.js';
import MAZE_ALGORITHMS from './algorithms-enum.js';

export default class MazeBuilder {
    constructor(sizeX = 50, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);

        this.gridViz;
        this.mazeBuilder;
        this.mazeBuilderViz;

        this.init();
    }

    run = () => this.mazeBuilder.run();

    buildMaze = () => {
        console.time('Generate Maze');
        this.gridViz.init();
        this.gridViz.drawAllNodes();
        this.run();
        console.timeEnd('Generate Maze');
    }

    changeAlgorithm = (algorithm) => {
        this.mazeBuilderViz.stopAnimFrame();
        this.setAlgorithm(algorithm);
        this.gridViz.drawAllNodes();
    }

    init = () => {
        this.gridViz = new GridViz(this.gridSizeX, this.gridSizeY);
        this.mazeBuilder = new RecursiveBacktracking(this.gridSizeX, this.gridSizeY);
    }

    initViz = () => {
        this.mazeBuilderViz = new MazeBuilderVisualization(this.gridSizeX, this.gridSizeY);
        this.gridViz.init();
        this.gridViz.drawAllNodes();
    }

    initEventListeners = () => {
        createMazeBtn.onclick = () => {
            this.mazeBuilderViz.stopAnimFrame();
            this.buildMaze();
            let stepsTaken = this.mazeBuilder.getStepsTaken();
            this.mazeBuilderViz.animateSteps(stepsTaken);
        }

        algorithmSelect.onchange = () => {
            algorithmSelect.blur();
            this.changeAlgorithm(MAZE_ALGORITHMS[algorithmSelect.value]);
        }
    }

    setAlgorithm = (algorithm) => this.mazeBuilder = new algorithm(this.gridSizeX, this.gridSizeY);
}