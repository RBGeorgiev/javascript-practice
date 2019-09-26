import Car from './car.js';
import Map from './map-draw.js';
import { map1 } from './map1.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.car = new Car(this);
        this.map = new Map;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.map.draw(ctx, map1);
        this.car.draw(ctx);
    }

    update(deltaTime) {
        this.car.update(deltaTime);
    }
}