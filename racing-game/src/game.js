import Car from './car.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.car = new Car(this);
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.car.draw(ctx)
    }

    update(deltaTime) {
        this.car.update(deltaTime);
    }
}