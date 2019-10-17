import Map from './map-loader.js';
// import Car from './car.js';
import { gameOptions, carControls } from './pc_inputs.js';
import { initNeat, startEvaluation, endEvaluation } from "../nn/nn.js";
import { drawCarsCheckbox, drawGatesCheckbox } from '../constants.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.init();
        this.map = new Map;
        this.paused = false;
        this.timer = 0;

        new gameOptions(this);
    }

    init() {
        initNeat();
        // this.car = new Car(this);
        // new carControls(this.car);
        this.cars = startEvaluation(this);
    }

    update(deltaTime) {
        if (this.paused) return;
        if (this.timer > 60000) {
            this.cars = [];
            console.log('timer ran out');
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

        this.map.drawTrack(ctx);

        if (drawGatesCheckbox.checked)
            this.map.drawGates(ctx);

        if (drawCarsCheckbox.checked) {
            for (let car of this.cars) {
                car.draw(ctx);
            }
        }
    }
}