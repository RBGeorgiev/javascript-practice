export default class Car {
    constructor(game) {
        this.size = {
            width: 40,
            height: 20
        };

        this.game = game;

        this.pos = {
            x: (this.game.gameWidth - this.size.width) / 2,
            y: (this.game.gameHeight - this.size.height) / 2
        }

        this.speed = 0.5;
        this.mod = 0;
        this.angle = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pos.x + this.size.width / 2, this.pos.y + this.size.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.rect(-this.size.width / 2, -this.size.height / 2, this.size.width, this.size.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();

    }

    update(deltaTime) {
        this.pos.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * this.angle) * deltaTime;
        this.pos.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * this.angle) * deltaTime;
    }
}