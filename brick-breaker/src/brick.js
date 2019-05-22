export default class Brick {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.width = 70;
        this.height = 30;

        this.position = {
            x: 280,
            y: 100
        }
    }


    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(deltaTime) {
        // top side collision
        if (
            this.game.ball.position.y > this.position.y - this.game.ball.radius
            && this.game.ball.position.y < this.position.y
            && this.game.ball.position.x > this.position.x
            && this.game.ball.position.x < this.position.x + this.width
        ) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.game.ball.position.y = this.position.y - this.game.ball.radius;
        }

        // bottom side collision
        if (
            this.game.ball.position.y < this.position.y + this.height + this.game.ball.radius
            && this.game.ball.position.y > this.position.y
            && this.game.ball.position.x > this.position.x
            && this.game.ball.position.x < this.position.x + this.width
        ) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.game.ball.position.y = this.position.y + this.game.ball.radius + this.height
        }

        // left side collision
        if (
            this.game.ball.position.x > this.position.x - this.game.ball.radius
            && this.game.ball.position.x < this.position.x
            && this.game.ball.position.y > this.position.y
            && this.game.ball.position.y < this.position.y + this.height
        ) {
            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.game.ball.position.x = this.position.x - this.game.ball.radius
        }

        //right side collision
        if (
            this.game.ball.position.x < this.position.x + this.width + this.game.ball.radius
            && this.game.ball.position.x > this.position.x
            && this.game.ball.position.y > this.position.y
            && this.game.ball.position.y < this.position.y + this.height
        ) {
            this.game.ball.speed.x = -this.game.ball.speed.x;
            this.game.ball.position.x = this.position.x + this.width + this.game.ball.radius;
        }
    }
}