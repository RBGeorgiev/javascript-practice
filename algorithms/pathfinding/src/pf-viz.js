import { ASTAR_TYPES, ASTAR_COLORS } from './enums.js';
import { ctx, animSpeedInput } from './constants.js';

export default class PathfindingVisualization {
    constructor(gridClass) {
        this.gridClass = gridClass;
        this.grid = gridClass.grid;
        this.animFrameId = null;
        this.animSpeed = +animSpeedInput.value;
    }

    setAnimSpeed = (val) => this.animSpeed = val;

    animateSteps = (stepsTaken) => {
        let start = 0;
        let deltaTime = 0;
        let i = 0;
        let len = stepsTaken.length;

        let timeout, j, speed;

        const step = (timestamp) => {
            deltaTime = timestamp - start;
            start = timestamp;

            if (i >= len - 1) return;

            speed = this.animSpeed;

            timeout = deltaTime / speed;
            j = 0;

            while (j < speed) {
                setTimeout(this.visualizeStep(stepsTaken, i + j), timeout * j)
                j++;
            }

            i += speed;

            this.setAnimFrameId(
                window.requestAnimationFrame(step)
            );
        }

        this.setAnimFrameId(
            window.requestAnimationFrame(step)
        );
    }

    stopAnimFrame = () => window.cancelAnimationFrame(this.animFrameId);

    visualizationController = (stepsTaken, complete) => (complete) ? this.drawSteps(stepsTaken) : this.animateSteps(stepsTaken);

    visualizeStep = (stepsTaken, idx) => {
        if (idx >= stepsTaken.length - 1) return;

        let curNode = stepsTaken[idx].node;
        let curType = stepsTaken[idx].type;

        if (curType === ASTAR_TYPES.PATH) {
            let nextNode = stepsTaken[idx + 1].node;
            this.drawPath(curNode, nextNode);
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
        else {
            this.drawPathfindingNode(curNode, ASTAR_COLORS[curType]);
        }
    }

    setAnimFrameId = (id) => this.animFrameId = id;

    drawPath = (nodeA, nodeB) => {
        let size = this.gridClass.nodeSize;
        let aX = size * nodeA.x + size / 2;
        let aY = size * nodeA.y + size / 2;
        let bX = size * nodeB.x + size / 2;
        let bY = size * nodeB.y + size / 2;

        ctx.strokeStyle = ASTAR_COLORS.PATH;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
    }

    drawPathfindingNode = (node, color) => {
        if (node.isStart || node.isEnd) return;
        let size = this.gridClass.nodeSize;
        let xPos = size * node.x;
        let yPos = size * node.y;

        ctx.beginPath();

        ctx.fillStyle = color;

        ctx.lineWidth = 1;
        ctx.strokeStyle = color;

        if (color === ASTAR_COLORS.CLOSED_LIST || color === ASTAR_COLORS.PATH) {
            ctx.arc(xPos + size / 2, yPos + size / 2, size / 3, 0, 2 * Math.PI);
        } else {
            ctx.rect(xPos + size / 4, yPos + size / 4, size / 2, size / 2);
        }

        ctx.fill();
        ctx.stroke();
    }

    drawSteps = (stepsTaken) => {
        let len = stepsTaken.length;
        for (let i = 0; i < len; i++) {
            this.visualizeStep(stepsTaken, i);
        }
    }
}