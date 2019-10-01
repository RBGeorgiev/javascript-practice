import Car from './car.js';
import Map from './map-loader.js';
import InputHandler from './input.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.init();
        this.map = new Map;
    }

    init() {
        this.car = new Car(this);
        new InputHandler(this, this.car);
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.map.draw(ctx);
        this.car.draw(ctx);
    }

    update(deltaTime) {
        this.car.update(deltaTime, this.map.track);
    }
}