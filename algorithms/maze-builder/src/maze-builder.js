export default class MazeBuilder {
    constructor(sizeX = 50, sizeY, algorithm) {
        this.gridSizeX = sizeX;
        this.gridSizeY = sizeY;
        this.currentBuilder = this.setAlgorithm(algorithm);
    }

    run = () => this.currentBuilder.run();

    getStepsTaken = () => this.currentBuilder.getStepsTaken();

    setAlgorithm = (algorithm) => this.currentBuilder = new algorithm(this.gridSizeX, this.gridSizeY);
}