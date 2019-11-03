import Game from "./src/game/game.js";
import { gameSpeed, gameSpeedVal, numberOfCars, numberOfCarsVal, mapCreatorCheckbox } from "./src/constants.js";
import { prevFittestJSON, prevGenerationJSON, genNumber } from "./src/nn/nn.js";
import exportPopulation from './src/export-pop.js';
import MapCreator from './src/map-creator.js'

// download previous generations
dlPrevGen.onclick = function () { exportPopulation(this, prevGenerationJSON, `generation_${genNumber - 1}`) }
dlFittest.onclick = function () { exportPopulation(this, prevFittestJSON, `fittest-${(genNumber - 151 < 0) ? 0 : genNumber - 151}-to-gen_${genNumber - 1}`) }

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
const mapCreator = new MapCreator(canvas, ctx)

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
        mapCreator.openMapCreator(game, ctx);
    }
}

// start game loop
window.requestAnimationFrame(gameLoop);


mapCreatorCheckbox.onchange = () => {
    mapCreatorCheckbox.blur();
    if (!mapCreatorCheckbox.checked) window.requestAnimationFrame(gameLoop);
}

const dlMapName = document.getElementById("dlMapName");

const cleanVal = val => val.replace(/[^\w]/g, '');

dlMapName.addEventListener("input", (e) => {
    let val = cleanVal(e.target.value)
    dlMapName.value = val
})

dlMap.onclick = function () {
    let obj = mapCreator.getMapObj()
    let name = dlMapName.value
    if (name.length < 1) name = "map_2"
    downloadMap(this, obj, name)
}

function downloadMap(el, json, name) {
    if (json.outerLines.length === 0) return alert('Track is missing outer boundary');
    if (json.innerLines.length === 0) return alert('Track is missing inner boundary');
    if (json.gates.length === 0) return alert('Track is missing reward gates');
    let obj = `export const ${name.toUpperCase()} = ${encodeURIComponent(JSON.stringify(json))}`;
    let data = "text/json;charset=utf-8," + obj;

    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", `${name}.js`);
}