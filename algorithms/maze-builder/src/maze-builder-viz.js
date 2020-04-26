export class MazeBuilderVisualization {
    constructor(gridClass, mazeBuilder) {
        this.gridClass = gridClass;
        this.grid = this.gridClass.grid;
        this.ctx = this.gridClass.ctx;

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

    visualizeStep = (step) => {
        let node = step.node;
        let color = step.type;
        this.gridClass.drawNode(node, color)
    }
    // visualizeStep = (step) => {
    //     let ctx = this.ctx;
    //     let node = step.node;
    //     let size = this.nodeSize;
    //     let posX = node.x * size;
    //     let posY = node.y * size;

    //     ctx.beginPath();

    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = "darkgray";
    //     ctx.rect(posX, posY, size, size);
    //     ctx.fillStyle = step.type; // white or black

    //     ctx.fill();
    //     ctx.stroke();
    // }

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    setAnimFrameId = (id) => this.animFrameId = id;
}