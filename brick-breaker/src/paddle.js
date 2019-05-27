import { verticalCollision, horizontalCollision } from "./collision-check.js";

export default class Paddle {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 150;
        this.height = 15;

        this.game = game;

        this.maxSpeed = 0.7;
        this.speed = 0;

        this.resetPaddle();
    }

    resetPaddle() {
        this.position = {
            x: (this.gameWidth - this.width) / 2,
            y: this.gameHeight - this.height - 20
        }
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    update(deltaTime) {
        this.position.x += this.speed * deltaTime;

        //add paddle collision 
        if (verticalCollision(this, this.game.ball)) {
            // makes ball bounce differently depending on where on the paddle it hits
            let paddleCenter = this.position.x + this.width / 2;
            // equals the number of pixels from the paddle center to the collision. Negative values = left of center, positive values = right of center
            let collisionRelativeToCenter = this.game.ball.position.x - paddleCenter;
            // equals a value between -1 and 1 depending on where the ball hit from the center
            let normalizedRelativeIntersectionX = (collisionRelativeToCenter / (this.width / 2));

            this.game.ball.speed.x = 0.5 * normalizedRelativeIntersectionX;
            this.game.ball.speed.y = -this.game.ball.speed.y;

            // fixes bug where ball would go inside paddle
            this.game.ball.position.y = this.position.y - this.game.ball.radius;
        }
        if (horizontalCollision(this, this.game.ball)) {
            this.game.ball.speed.x = -this.game.ball.speed.x;
        }

        //stop paddle from going off screen
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}