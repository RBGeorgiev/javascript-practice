import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js"

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        // placeholder/test bricks
        this.bricks = [
            new Brick(this, { x: 280, y: 100 }),
            new Brick(this, { x: 280 + 70, y: 100 }),
            new Brick(this, { x: 280 + 70 * 2, y: 100 }),
            new Brick(this, { x: 280 + 70 * 3, y: 100 }),
            new Brick(this, { x: 280 + 70 * 4, y: 100 }),
            new Brick(this, { x: 280 + 70 * 5, y: 100 }),
            new Brick(this, { x: 280 + 70 * 6, y: 100 }),
            new Brick(this, { x: 280 + 70 * 7, y: 100 }),
        ];

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