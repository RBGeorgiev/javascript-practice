import Game from "./src/game.js";

const slider = document.getElementById("gameSpeed");
const output = document.getElementById("gameSpeedVal");

output.innerHTML = slider.value;
let gameSpeed = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    gameSpeed = this.value;
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const game = new Game(canvas.width, canvas.height);

let lastTime = 0, deltaTime;

function gameLoop(timestamp) {
    //delta time is how much time has passed since last refresh of the screen
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gameSpeed; i++) {
        game.update(deltaTime);
    }
    game.draw(ctx);

    // requestAnimationFrame executes on next available screen repaint, instead of on predetermined delay (e.g. every 50ms). This stops errors in time stamps if slow computers bottleneck. 
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);