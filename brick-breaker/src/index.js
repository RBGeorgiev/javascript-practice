import Paddle from "./paddle.js";
import InputHandler from "./input.js";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.style.border = '1px black solid'

canvas.width = 900
canvas.height = 600

let paddle = new Paddle(canvas.width, canvas.height);
new InputHandler(paddle);

let lastTime = 0, deltaTime;

function gameLoop(timestamp) {
    //delta time is how much time has passed since last refresh of the screen
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paddle.update(deltaTime)
    paddle.draw(ctx);

    // requestAnimationFrame executes on next available screen repaint, instead of on predetermined delay (e.g. every 50ms). This stops errors in time stamps if slow computers bottleneck. 
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);