import Game from "./src/game/game.js";
import { gameSpeed, gameSpeedVal, numberOfCars, numberOfCarsVal, mapCreatorCheckbox } from "./src/constants.js";
import { prevFittestJSON, prevGenerationJSON, genNumber } from "./src/nn/nn.js";
import { exportPopulation, downloadMap } from './src/dl-functions.js';
import MapCreator from './src/maps/map-creator.js';

// download previous generations
dlPrevGen.onclick = function () { exportPopulation(this, prevGenerationJSON, `generation_${genNumber - 1}`) }
dlFittest.onclick = function () { exportPopulation(this, prevFittestJSON, `fittest-${(genNumber - 151 < 0) ? 0 : genNumber - 151}-to-gen_${genNumber - 1}`) }

// download map from creator
dlMap.onclick = function () {
    let obj = mapCreator.getMapObj();
    let name = dlMapName.value;
    if (name.length < 1) name = "map_2";
    downloadMap(this, obj, name);
}

// restrict map name to letter, numbers and underscore
const cleanVal = val => val.replace(/[^\w]/g, '');
dlMapName.addEventListener("input", (e) => dlMapName.value = cleanVal(e.target.value));

// set game speed
gameSpeedVal.innerHTML = gameSpeed.value;

gameSpeed.oninput = function () {
    gameSpeedVal.innerHTML = this.value;
    gameSpeed.value = this.value;
}

// set number of cars to draw
numberOfCarsVal.innerHTML = numberOfCars.value;

numberOfCars.oninput = function () {
    numberOfCarsVal.innerHTML = this.value;
    numberOfCars.value = this.value;
}

// init canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// init game
export const game = new Game(canvas.width, canvas.height);
const mapCreator = new MapCreator(canvas, ctx);

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

    if (!mapCreatorCheckbox.checked) {
        // requestAnimationFrame executes on next available screen repaint, instead of on predetermined delay (e.g. every 50ms). This stops errors in time stamps if slow computers bottleneck. 
        window.requestAnimationFrame(gameLoop);
    } else {
        mapCreator.open(game);
    }
}

// start game loop
window.requestAnimationFrame(gameLoop);

// re-run game loop after exiting map editor
mapCreatorCheckbox.onchange = () => {
    // remove focus from checkbox after click
    mapCreatorCheckbox.blur();


    if (!mapCreatorCheckbox.checked) {
        window.requestAnimationFrame(gameLoop);
        for (let el of document.getElementsByClassName("controls")) el.style.display = "flex";
        for (let el of document.getElementsByClassName("mapCreatorControls")) el.style.display = "none";
    } else {
        for (let el of document.getElementsByClassName("controls")) el.style.display = "none";
        for (let el of document.getElementsByClassName("mapCreatorControls")) el.style.display = "block";
    }
}