import { canvas } from './constants.js';

export class MazeBuilderVisualization {
    constructor(gridClass, mazeBuilder) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;

        this.mazeBuilder = mazeBuilder;
        this.nodeSize = canvas.width / this.gridClass.gridSizeX;
        this.animFrameId = null;
    }

    animateSteps = (stepsTaken) => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = stepsTaken.length;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i > len - 1) return;

            this.visualizeStep(stepsTaken[i]);

            i++;

            this.setAnimFrameId(
                window.requestAnimationFrame(step)
            );
        }

        this.setAnimFrameId(
            window.requestAnimationFrame(step)
        );
    }

    visualizeStep = (step) => this.gridClass.drawNode(step.node, step.type);

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    setAnimFrameId = (id) => this.animFrameId = id;
}