import Game from "./src/game/game.js";
import { gameSpeed, gameSpeedVal, numberOfCars, numberOfCarsVal } from "./src/constants.js";
import { prevFittestJSON, prevGenerationJSON, genNumber } from "./src/nn/nn.js";
import exportPopulation from './src/export-pop.js';


dlPrevGen.onclick = function () { exportPopulation(this, prevGenerationJSON, `generation_${genNumber - 1}`) }
dlFittest.onclick = function () { exportPopulation(this, prevFittestJSON, `fittest-${(genNumber - 151 < 0) ? 0 : genNumber - 151}-to-gen_${genNumber - 1}`) }

gameSpeedVal.innerHTML = gameSpeed.value;

gameSpeed.oninput = function () {
    gameSpeedVal.innerHTML = this.value;
    gameSpeed.value = this.value;
}

numberOfCarsVal.innerHTML = numberOfCars.value;

numberOfCars.oninput = function () {
    numberOfCarsVal.innerHTML = this.value;
    numberOfCars.value = this.value;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

export const game = new Game(canvas.width, canvas.height);

let lastTime = 0, deltaTime;

function gameLoop(timestamp) {
    //delta time is how much time has passed since last refresh of the screen
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gameSpeed.value; i++) {
        game.update(deltaTime);
    }
    game.draw(ctx);

    // requestAnimationFrame executes on next available screen repaint, instead of on predetermined delay (e.g. every 50ms). This stops errors in time stamps if slow computers bottleneck. 
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);