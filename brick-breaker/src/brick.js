import { verticalCollision, horizontalCollision } from "./collision-check.js";

export default class Brick {
    constructor(game, position) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.width = 60;
        this.height = 30;

        this.position = position;

        this.hit = false;
    }

    update() {
        if (verticalCollision(this, this.game.ball)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.hit = true;
            //filter out the hit brick from the current level array
            this.game.bricks = this.game.bricks.filter(brick => !brick.hit);
            this.game.score += 1 * this.game.multiplier;
            return; // fixes bug causing score to count twice if ball hits brick corner
        }
        if (horizontalCollision(this, this.game.ball)) {
            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.hit = true;
            //filter out the hit brick from the current level array 
            this.game.bricks = this.game.bricks.filter(brick => !brick.hit);
            this.game.score += 1 * this.game.multiplier;
            return;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}