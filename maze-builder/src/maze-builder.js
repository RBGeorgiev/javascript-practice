export default class MazeBuilder {
    constructor(gridClass, algorithm) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.currentBuilder = this.setAlgorithm(algorithm);
    }

    run = () => this.currentBuilder.run();

    getStepsTaken = () => this.currentBuilder.getStepsTaken();

    setAlgorithm = (algorithm) => this.currentBuilder = new algorithm(this.gridClass);
}