export default class InputHandler {
    constructor(paddle, game) {
        // Movement event listeners
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 37: // Left arrow
                case 65: // 'A'
                    paddle.moveLeft()
                    break;

                case 39: // Right arrow
                case 68: // 'D'
                    paddle.moveRight()
                    break;
            }
        })

        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 37: // Left arrow
                case 65: // 'A'
                    if (paddle.speed < 0) // fixes a bug causing paddle to stop if moving right
                        paddle.stop()
                    break;

                case 39: // Right arrow
                case 68: // 'D'
                    if (paddle.speed > 0) // fixes a bug causing paddle to stop if moving left
                        paddle.stop()
                    break;
            }
        })

        // Game state event listeners
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 32: // Space
                case 80: // 'P'
                    game.togglePause();
                    break;

                case 38: // Up arrow
                case 87: // 'W'
                    game.ball.startMoving();
                    break;

                case 13: // Enter
                    game.init();
                    break;
            }
        })
    }
}