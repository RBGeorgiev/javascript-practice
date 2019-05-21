export default class Ball {
    constructor(gameWidth, gameHeight, paddle) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.paddle = paddle;

        this.radius = 10;

        this.speed = {
            x: 0.5,
            y: 0.5
        }

        this.position = {
            x: 100,
            y: 75
        }
    }

    draw(ctx) {
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;

        if (
            this.position.y > this.paddle.position.y - this.radius &&
            this.position.x > this.paddle.position.x &&
            this.position.x < this.paddle.position.x + this.paddle.width
        )
            this.speed.y = -this.speed.y

        if (this.position.y > this.gameHeight - this.radius) {
            this.speed.y = -this.speed.y
        }
        if (this.position.x > this.gameWidth - this.radius) {
            this.speed.x = -this.speed.x
        }
        if (this.position.y < this.radius) {
            this.speed.y = -this.speed.y
        }
        if (this.position.x < this.radius) {
            this.speed.x = -this.speed.x
        }



    }
}