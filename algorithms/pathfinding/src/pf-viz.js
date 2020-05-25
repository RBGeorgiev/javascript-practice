import { PF_NODE_TYPES, PF_NODE_COLORS } from './enums.js';
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

        if (curType === PF_NODE_TYPES.PATH) {
            let nextNode = stepsTaken[idx + 1].node;
            this.drawPath(curNode, nextNode);
            this.drawPathfindingNode(curNode, PF_NODE_COLORS[curType]);
        }
        else {
            this.drawPathfindingNode(curNode, PF_NODE_COLORS[curType]);
        }
    }

    setAnimFrameId = (id) => this.animFrameId = id;

    drawPath = (nodeA, nodeB) => {
        let size = this.gridClass.nodeSize;
        let aX = (nodeA.isHex) ? nodeA.hexCenter.x : size * nodeA.x + size / 2;
        let aY = (nodeA.isHex) ? nodeA.hexCenter.y : size * nodeA.y + size / 2;
        let bX = (nodeB.isHex) ? nodeB.hexCenter.x : size * nodeB.x + size / 2;
        let bY = (nodeB.isHex) ? nodeB.hexCenter.y : size * nodeB.y + size / 2;

        ctx.strokeStyle = PF_NODE_COLORS.PATH;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.moveTo(aX, aY);
        ctx.lineTo(bX, bY);
        ctx.stroke();
    }

    drawPathfindingNode = (node, color) => {
        if (node.isStart || node.isEnd) return;
        let size = this.gridClass.nodeSize;
        let xPos = (node.isHex) ? node.hexCenter.x : size * node.x + size / 2;
        let yPos = (node.isHex) ? node.hexCenter.y : size * node.y + size / 2;

        ctx.beginPath();

        ctx.fillStyle = color;

        ctx.lineWidth = 1;

        if (color === PF_NODE_COLORS.CLOSED_LIST || color === PF_NODE_COLORS.PATH) {
            ctx.arc(xPos, yPos, size / 2.8, 0, 2 * Math.PI);
        } else {
            ctx.rect(xPos - size / 4, yPos - size / 4, size / 2, size / 2);
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