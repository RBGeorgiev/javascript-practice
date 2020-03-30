import MAZE_ALGORITHMS from './algorithms-enum.js';

export default class MazeBuilder {
    constructor(sizeX = 50, sizeY) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY || Math.floor(this.gridSizeX / 2);

        this.currentBuilder = this.setAlgorithm(MAZE_ALGORITHMS['RecursiveBacktracking']);
    }

    run = () => this.currentBuilder.run();

    getStepsTaken = () => this.currentBuilder.getStepsTaken();

    setAlgorithm = (algorithm) => this.currentBuilder = new algorithm(this.gridSizeX, this.gridSizeY);
}