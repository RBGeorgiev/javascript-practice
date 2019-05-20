export default class Paddle {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.width = 200;
        this.height = 25;

        this.speed = 20;

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
        this.position.x -= this.speed;
    }

    moveRight() {
        this.position.x += this.speed;
    }

    update(deltaTime) {
        if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width
        if (this.position.x < 0) this.position.x = 0;
    }
}