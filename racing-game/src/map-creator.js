import drawLines from './draw-lines.js';

let radioButtons = document.querySelectorAll('input[name="mapCreatorTarget"]');

export default class MapCreator {
    constructor(canvas, ctx) {
        this.ctx = ctx;
        this.prevX = null;
        this.prevY = null;

        this.target = document.querySelector('input[name="mapCreatorTarget"]:checked').value;

        this.outerLinesArr = [];
        this.innerLinesArr = [];
        this.gatesArr = [];

        canvas.addEventListener("click", this.addPath);

        for (let radio of radioButtons) {
            radio.addEventListener("click", (e) => {
                this.prevX = null;
                this.prevY = null;
                this.target = e.target.value;
            })
        }
    }

    open(game) {
        const ctx = this.ctx;

        game.paused = true;

        // background color
        ctx.fillStyle = 'lightgrey';
        ctx.rect(0, 0, game.gameWidth, game.gameHeight);
        ctx.fill();

        // reset value to avoid bug
        this.prevX = null;
        this.prevY = null;

        // draw car position
        let rectSize = 5;
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(game.startPos.x - rectSize / 2, game.startPos.y + rectSize / 2, rectSize, rectSize);
        ctx.fill();

        this.drawCreatedMap(ctx);
    }

    drawCreatedMap(ctx) {
        drawLines(ctx, this.outerLinesArr, "purple");
        drawLines(ctx, this.innerLinesArr, "blue");
        drawLines(ctx, this.gatesArr, "green");
    }

    addPath = (e) => {
        if (!mapCreatorCheckbox.checked) return;
        let curTarget, curX, curY;

        if (this.target === "outer") {
            curTarget = this.outerLinesArr;
        } else if (this.target === "inner") {
            curTarget = this.innerLinesArr;
        } else if (this.target === "gates") {
            curTarget = this.gatesArr;
        }

        if (!this.prevX || !this.prevY) {
            this.prevX = e.offsetX;
            this.prevY = e.offsetY;
            return;
        }

        curX = e.offsetX;
        curY = e.offsetY;

        const coordObj = {
            x1: this.prevX,
            y1: this.prevY,
            x2: curX,
            y2: curY
        }
        curTarget.push(coordObj);

        this.drawCreatedMap(this.ctx);

        this.prevX = (this.target === "gates") ? null : curX;
        this.prevY = (this.target === "gates") ? null : curY;
    }

    getMapObj() {
        this.gatesArr.forEach((el, idx) => el.id = idx + 1);
        return {
            "outerLines": this.outerLinesArr,
            "innerLines": this.innerLinesArr,
            "gates": this.gatesArr
        }
    }
}