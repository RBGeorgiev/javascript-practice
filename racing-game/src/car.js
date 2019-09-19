export default class Car {
    constructor(game) {
        this.size = {
            width: 20,
            height: 40
        };

        this.game = game

        this.pos = {
            x: (this.game.gameWidth - this.size.width) / 2,
            y: (this.game.gameHeight - this.size.height) / 2
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
    }

    update(deltaTime) { }
}