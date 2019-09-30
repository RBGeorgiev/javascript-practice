import Car from './car.js';
import Map from './map-draw.js';


export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.car = new Car(this);
        this.map = new Map;

        this.track = [
            ...this.map.map.outerLines,
            ...this.map.map.innerLines
        ];
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.map.draw(ctx);
        this.car.draw(ctx);
    }

    update(deltaTime) {
        this.car.update(deltaTime);
        this.car.sensorTrackCollision(this.track);
        this.car.carTrackCollision(this.track);
    }
}