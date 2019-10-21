import Map from './map-loader.js';
// import Car from './car.js';
import { gameOptions, carControls } from './pc_inputs.js';
import Neat from "../nn/nn.js";
import { drawCarsCheckbox, drawGatesCheckbox, numberOfCars } from '../constants.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.neat = new Neat;

        this.init();
        this.map = new Map;
        this.paused = false;
        this.timer = 0;

        new gameOptions(this);
    }

    init() {
        this.neat.initNeat();
        // this.car = new Car(this);
        // new carControls(this.car);
        this.cars = this.neat.startEvaluation(this);
    }

    update(deltaTime) {
        if (this.paused) return;
        if (this.timer > 60000) {
            this.cars = [];
            console.log('timer ran out');
        }

        // this.car.update(deltaTime)

        if (this.cars.length === 0) {
            this.cars = this.neat.endEvaluation(this);
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
            for (let i = 0; i < numberOfCars.value; i++) {
                if (this.cars[i]) this.cars[i].draw(ctx);
            }
        }
    }
}