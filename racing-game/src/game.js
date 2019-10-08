// import Car from './car.js';
import Map from './map-loader.js';
import InputHandler from './input.js';;
import { initNeat, startEvaluation, endEvaluation } from "./nn.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.init();
        this.map = new Map;
        this.paused = false;
        this.timer = 0;
    }

    init() {
        initNeat();
        // this.car = new Car(this);
        // new InputHandler(this, this.car);
        this.cars = startEvaluation(this);
        new InputHandler(this, this.cars[0]);
    }

    update(deltaTime) {
        if (this.paused) return;
        if (this.timer > 60000) {
            this.cars = [];
            console.log('timer ran out')
        }

        // this.car.update(deltaTime)

        if (this.cars.length === 0) {
            this.cars = endEvaluation(this);
            this.timer = 0;
        }

        this.timer += deltaTime;

        for (let i = this.cars.length - 1; i >= 0; i--) {
            this.cars[i].update(deltaTime);
            if (this.cars[i].crashed) this.cars.splice(i, 1);
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        // this.car.draw(ctx)

        this.map.draw(ctx);
        for (let car of this.cars) {
            car.draw(ctx);
        }
    }
}