import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import levelLoader from "./level-loader.js";
import levels from "./levels.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.paused = false;
        this.won = false;
        this.lives = 3;

        this.levels = levels
        this.currentLevel = 0;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = [];

        levelLoader(this, this.levels[this.currentLevel]);

        new InputHandler(this.paddle, this);
    }

    togglePause() {
        this.paused = !this.paused;
    }

    update(deltaTime) {
        if (this.paused || this.won || this.lives === 0) return;
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);

        //filter out hit bricks
        this.bricks = this.bricks.filter(brick => !brick.hit);

        // draw bricks
        this.bricks.forEach(brick => brick.update());
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);

        this.bricks.forEach(brick => brick.draw(ctx));

        // paused overlay placeholder
        if (this.paused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '50px serif';
            ctx.textAlign = "center"
            ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2)
        }

        // won overlay placeholder
        if (this.bricks.length === 0) {
            // if there is a next level
            if (this.currentLevel + 1 < this.levels.length) {
                // start next level
                this.currentLevel++;
                this.start();
                return;
            }
            this.won = true;
            ctx.fillStyle = "rgba(0, 55, 0, 0.6)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '50px serif';
            ctx.textAlign = "center"
            ctx.fillText("YOU WON", this.gameWidth / 2, this.gameHeight / 2)
        }

        // lost overlay placeholder
        if (this.lives === 0) {
            ctx.fillStyle = "rgba(55, 0, 0, 0.6)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = '50px serif';
            ctx.textAlign = "center"
            ctx.fillText("YOU LOST", this.gameWidth / 2, this.gameHeight / 2)
        }
    }
}
