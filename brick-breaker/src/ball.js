export default class Ball {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.radius = 10;

        this.waitingToStart = true;

        this.resetBall()
    }

    resetBall() {
        this.speed = {
            x: 0,
            y: 0
        }

        this.position = {
            x: this.game.paddle.position.x + this.game.paddle.width / 2,
            y: this.game.paddle.position.y - 20
        }
    }

    startMoving() {
        if (this.waitingToStart) {

            this.speed = {
                x: 0.3,
                y: -0.5
            }

            this.waitingToStart = false;
        }
    }

    update(deltaTime) {
        if (this.waitingToStart) {
            this.position.x = this.game.paddle.position.x + this.game.paddle.width / 2
        }

        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;

        //bottom wall removes life
        if (this.position.y > this.gameHeight - this.radius) {
            this.game.lives--;
            this.waitingToStart = true;
            this.resetBall();
        }
        //right wall collision
        if (this.position.x > this.gameWidth - this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x = this.gameWidth - this.radius; //fixes bug where ball would go into the wall or disappear
        }
        //top wall collision
        if (this.position.y < this.radius) {
            this.speed.y = -this.speed.y;
            this.position.y = this.radius; //fixes bug where ball would go into the wall and/or disappear
        }
        //left wall collision
        if (this.position.x < this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x = this.radius; //fixes bug where ball would go into the wall or disappear
        }
    }

    draw(ctx) {
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        if (this.waitingToStart && this.game.lives !== 0) {
            ctx.font = '50px serif';
            ctx.textAlign = "center"
            ctx.fillText(`Press Up Arrow key to Start`, this.gameWidth / 2, this.gameHeight / 2)

            ctx.fillStyle = "red"
            ctx.fillText(`Press Enter to Restart the game`, this.gameWidth / 2, this.gameHeight / 2 + 50)
        }
    }
}