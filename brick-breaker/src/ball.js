export default class Ball {
    constructor(game) {
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.radius = 10;

        this.speed = {
            x: 0.5,
            y: -0.5
        }

        this.position = {
            x: 100,
            y: 425
        }
    }

    draw(ctx) {
        ctx.fillStyle = "blue"
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(deltaTime) {
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;

        //add paddle collision 
        if (
            this.position.y > this.game.paddle.position.y - this.radius
            && this.position.x > this.game.paddle.position.x
            && this.position.x < this.game.paddle.position.x + this.game.paddle.width
        ) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.radius;
        }

        //add bottom wall collision (temporary)
        if (this.position.y > this.gameHeight - this.radius) {
            this.speed.y = -this.speed.y;
            this.position.y = this.gameHeight - this.radius; //fixes edge case bug where ball would go into the wall or disappear
        }
        //add right wall collision
        if (this.position.x > this.gameWidth - this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x = this.gameWidth - this.radius; //fixes edge case bug where ball would go into the wall or disappear
        }
        //add top wall collision
        if (this.position.y < this.radius) {
            this.speed.y = -this.speed.y;
            this.position.y = this.radius; //fixes edge case bug where ball would go into the wall and/or disappear
        }
        //add left wall collision
        if (this.position.x < this.radius) {
            this.speed.x = -this.speed.x;
            this.position.x = this.radius; //fixes edge case bug where ball would go into the wall or disappear
        }
    }
}