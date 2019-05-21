export default class Paddle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.width = 150;
        this.height = 25;

        this.maxSpeed = 0.7;
        this.speed = 0;

        this.position = {
            x: (gameWidth - this.width) / 2,
            y: gameHeight - this.height - 40
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
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

        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }
}