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
            // top side collision
            if (
                this.game.ball.position.y > this.position.y - this.game.ball.radius
                && this.game.ball.position.y < this.position.y
                && this.game.ball.position.x > this.position.x
                && this.game.ball.position.x < this.position.x + this.width
            ) {
                this.game.ball.speed.y = -this.game.ball.speed.y;
                // this.game.ball.position.y = this.position.y - this.game.ball.radius;
                this.hit = true;
            }

            // bottom side collision
            if (
                this.game.ball.position.y < this.position.y + this.height + this.game.ball.radius
                && this.game.ball.position.y > this.position.y
                && this.game.ball.position.x > this.position.x
                && this.game.ball.position.x < this.position.x + this.width
            ) {
                this.game.ball.speed.y = -this.game.ball.speed.y;
                // this.game.ball.position.y = this.position.y + this.game.ball.radius + this.height;
                this.hit = true;
            }

            // left side collision
            if (
                this.game.ball.position.x > this.position.x - this.game.ball.radius
                && this.game.ball.position.x < this.position.x
                && this.game.ball.position.y > this.position.y
                && this.game.ball.position.y < this.position.y + this.height
            ) {
                this.game.ball.speed.x = -this.game.ball.speed.x;
                // this.game.ball.position.x = this.position.x - this.game.ball.radius;
                this.hit = true;
            }

            //right side collision
            if (
                this.game.ball.position.x < this.position.x + this.width + this.game.ball.radius
                && this.game.ball.position.x > this.position.x
                && this.game.ball.position.y > this.position.y
                && this.game.ball.position.y < this.position.y + this.height
            ) {
                this.game.ball.speed.x = -this.game.ball.speed.x;
                // this.game.ball.position.x = this.position.x + this.width + this.game.ball.radius;
                this.hit = true;
            }
        }
    }
}