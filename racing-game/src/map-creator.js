let radioButtons = document.querySelectorAll('input[name="mapCreatorTarget"]');

export default class MapCreator {
    constructor(canvas, ctx) {
        this.ctx = ctx
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

    openMapCreator(game, ctx) {
        game.paused = true;
        // background color
        ctx.fillStyle = 'lightgrey';
        ctx.rect(0, 0, game.gameWidth, game.gameHeight);
        ctx.fill();
        // reset value to avoid bug
        this.prevX = null;
        this.prevY = null;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(game.startPos.x - 2.5, game.startPos.y + 2.5, 5, 5);
        ctx.fill();
        this.drawCreatedMap(ctx);
    }

    drawCreatedMap(ctx) {
        this.drawLines(ctx, this.outerLinesArr, "purple");
        this.drawLines(ctx, this.innerLinesArr, "blue");
        this.drawLines(ctx, this.gatesArr, "green");
    }

    drawLines(ctx, lines, color = "#000000") {
        ctx.beginPath();
        for (let i = 0; i < lines.length; i++) {
            ctx.moveTo(lines[i].x1, lines[i].y1);
            ctx.lineTo(lines[i].x2, lines[i].y2);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    addPath = (e) => {
        if (!mapCreatorCheckbox.checked) return;
        let curTarget;

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

        let curX = e.offsetX;
        let curY = e.offsetY;

        let coordObj = {
            x1: this.prevX,
            y1: this.prevY,
            x2: curX,
            y2: curY
        }
        curTarget.push(coordObj)

        this.drawCreatedMap(this.ctx)

        this.prevX = (this.target === "gates") ? null : curX;
        this.prevY = (this.target === "gates") ? null : curY;
    }

    getMapObj() {
        return {
            "outerLines": this.outerLinesArr,
            "innerLines": this.innerLinesArr,
            "gates": this.gatesArr
        }
    }
}