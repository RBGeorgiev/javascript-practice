import { verticalCollision, horizontalCollision } from "./collision-check.js";

export default class Brick {
    constructor(game, position) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.width = 70;
        this.height = 30;

        this.position = position;

        this.hit = false;
    }

    draw(ctx) {
        //if brick is hit don't draw
        if (!this.hit) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        // if brick is hit remove collision
        if (!this.hit) {
            if (verticalCollision(this, this.game.ball)) {
                this.game.ball.speed.y = -this.game.ball.speed.y;
                this.hit = true;
            }
            if (horizontalCollision(this, this.game.ball)) {
                this.game.ball.speed.x = -this.game.ball.speed.x;
                this.hit = true;
            }
        }
    }
}