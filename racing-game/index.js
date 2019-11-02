import Game from "./src/game/game.js";
import { gameSpeed, gameSpeedVal, numberOfCars, numberOfCarsVal, mapCreator } from "./src/constants.js";
import { prevFittestJSON, prevGenerationJSON, genNumber } from "./src/nn/nn.js";
import exportPopulation from './src/export-pop.js';

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

    if (!mapCreator.checked) {
        // requestAnimationFrame executes on next available screen repaint, instead of on predetermined delay (e.g. every 50ms). This stops errors in time stamps if slow computers bottleneck. 
        window.requestAnimationFrame(gameLoop);
    } else {
        game.paused = true;
        // background color
        ctx.fillStyle = 'lightgrey';
        ctx.rect(0, 0, game.gameWidth, game.gameHeight);
        ctx.fill();
        // reset value to avoid bug
        prevX = null;
        prevY = null;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(game.startPos.x - 2.5, game.startPos.y + 2.5, 5, 5);
        ctx.fill();
        drawCreatedMap()
    }
}

// start game loop
window.requestAnimationFrame(gameLoop);

mapCreator.onchange = () => {
    mapCreator.blur();
    if (!mapCreator.checked) window.requestAnimationFrame(gameLoop);
}


let prevX, prevY,
    target = document.querySelector('input[name="mapCreatorTarget"]:checked').value,
    outerLinesArr = [],
    innerLinesArr = [],
    gatesArr = [];

let radioButtons = document.querySelectorAll('input[name="mapCreatorTarget"]')
for (let radio of radioButtons) {
    radio.addEventListener("click", (e) => {
        prevX = null;
        prevY = null;
        target = e.target.value;
    })
}

canvas.addEventListener("click", (e) => {
    if (!mapCreator.checked) return;
    let curTarget;

    if (target === "outer") {
        curTarget = outerLinesArr;
    } else if (target === "inner") {
        curTarget = innerLinesArr;
    } else if (target === "gates") {
        curTarget = gatesArr;
    }


    if (!prevX || !prevY) {
        prevX = e.offsetX;
        prevY = e.offsetY;
        return;
    }

    let curX = e.offsetX;
    let curY = e.offsetY;

    let coordObj = {
        x1: prevX,
        y1: prevY,
        x2: curX,
        y2: curY
    }
    curTarget.push(coordObj)

    drawCreatedMap()

    prevX = (target === "gates") ? null : curX;
    prevY = (target === "gates") ? null : curY;
})

function drawCreatedMap() {
    drawLines(outerLinesArr, "purple");
    drawLines(innerLinesArr, "blue");
    drawLines(gatesArr, "green");
}

function drawLines(lines, color = "#000000") {
    ctx.beginPath();
    for (let i = 0; i < lines.length; i++) {
        ctx.moveTo(lines[i].x1, lines[i].y1);
        ctx.lineTo(lines[i].x2, lines[i].y2);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
}

const dlMapName = document.getElementById("dlMapName");

const cleanVal = val => val.replace(/[^\w]/g, '');

dlMapName.addEventListener("input", (e) => {
    let val = cleanVal(e.target.value)
    dlMapName.value = val
})

dlMap.onclick = function () {
    let obj = {
        "outerLines": outerLinesArr,
        "innerLines": innerLinesArr,
        "gates": gatesArr
    }
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