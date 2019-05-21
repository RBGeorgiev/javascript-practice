export default class InputHandler {
    constructor(paddle) {
        document.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case 37:
                    paddle.moveLeft()
                    break;

                case 39:
                    paddle.moveRight()
                    break;
            }
        })

        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case 37:
                    if (paddle.speed < 0) // fixes a bug causing paddle to stop if moving right
                        paddle.stop()
                    break;

                case 39:
                    if (paddle.speed > 0) // fixes a bug causing paddle to stop if moving left
                        paddle.stop()
                    break;
            }
        })
    }
}