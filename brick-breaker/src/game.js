import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import { levelCreator, levelTest } from "./level-creator.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = []

        levelCreator(this, levelTest);

        new InputHandler(this.paddle);
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.bricks.forEach(brick => brick.draw(ctx));
    }

    update(deltaTime) {
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);
        this.bricks.forEach(brick => brick.update());
    }
}