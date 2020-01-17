import { currentPlayer } from '../../index.js';
import Map from '../maps/map-loader.js';
import Car from './car.js';
import { GameOptions, CarControls } from './inputs.js';
import Neat from "../nn/nn.js";
import { drawCarsCheckbox, drawGatesCheckbox, numberOfCars } from '../constants.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.startPos = {
            x: 357,
            y: 130,
        }

        this.init();
    }

    init() {
        if (currentPlayer === 1) {
            this.neat = new Neat;
            this.timer = 0;
            this.neat.initNeat();
            this.cars = this.neat.startEvaluation(this);
        } else if (currentPlayer === 2) {
            this.car = new Car(this);
            new CarControls(this.car);
        }
        this.map = new Map;
        this.paused = false;
        new GameOptions(this, currentPlayer);
    }

    update(deltaTime) {
        if (this.paused) return;

        if (currentPlayer === 1) {
            if (this.timer > 60000) {
                this.cars = [];
                console.log('timer ran out');
            }

            if (this.cars.length === 0) {
                this.cars = this.neat.endEvaluation(this);
                this.timer = 0;
            }

            this.timer += deltaTime;

            for (let i = this.cars.length - 1; i >= 0; i--) {
                this.cars[i].update(deltaTime);
                if (this.cars[i].crashed) this.cars.splice(i, 1);
            }
        } else if (currentPlayer === 2) {
            this.car.update(deltaTime);
        }
    }

    draw(ctx) {
        this.drawBackground(ctx);

        if (drawTrackCheckbox.checked)
            this.map.drawTrack(ctx);

        if (currentPlayer === 1) {
            if (drawCarsCheckbox.checked) {
                for (let i = 0; i < numberOfCars.value; i++) {
                    if (this.cars[i]) this.cars[i].draw(ctx);
                }
            }
        } else if (currentPlayer === 2) {
            this.car.draw(ctx);
            if (this.car.crashed) {
                this.drawCrashedScreen(ctx);
            }
        }

        if (drawGatesCheckbox.checked)
            this.map.drawGates(ctx);

        if (this.paused) this.drawPauseScreen(ctx);
    }

    drawBackground(ctx) {
        ctx.fillStyle = 'grey';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
    }

    drawPauseScreen(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "125px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    drawCrashedScreen(ctx) {
        let fontSize = 90;
        ctx.fillStyle = "rgba(155,0,0,0.4)"
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("Crashed!", this.gameWidth / 2, this.gameHeight / 2 - fontSize / 2);
        ctx.fillText("Press R to restart", this.gameWidth / 2, this.gameHeight / 2 + fontSize / 2);
    }
}