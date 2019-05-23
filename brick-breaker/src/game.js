import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { levelCreator, levelTest } from "./level-creator.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.paused = false;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = [];

        levelCreator(this, levelTest);

        new InputHandler(this.paddle, this);
    }

    togglePause() {
        this.paused = !this.paused;
    }

    update(deltaTime) {
        if (this.paused) return
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);

        this.bricks = this.bricks.filter(brick => !brick.hit);
        this.bricks.forEach(brick => brick.update());

        console.log(this.bricks)
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);

        this.bricks.forEach(brick => brick.draw(ctx));

        // paused overlay placeholder
        if (this.paused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        }

        // won overlay placeholder
        if (this.bricks.length === 0) {
            this.paused = true;
            ctx.fillStyle = "rgba(255, 255, 0, 0.6)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        }
    }
}
