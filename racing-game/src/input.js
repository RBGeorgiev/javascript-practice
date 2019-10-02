export default class InputHandler {
    constructor(game, car) {
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 38: //UP
                    car.moveForward();
                    break;

                case 40: //DOWN
                    car.moveBack();
                    break;

                case 37: //LEFT
                    car.turnLeft();
                    break;

                case 39: //RIGHT
                    car.turnRight();
                    break;

                case 13: // Enter
                    game.init();
                    break;

                case 32: // Space
                    game.cars = [];
                    break;
            }
        });

        document.addEventListener('keyup', e => {
            switch (e.keyCode) {
                case 38: //UP
                case 40: //DOWN
                    car.stopMoving();
                    break;
                case 37: //LEFT
                    if (car.rotate < 0) {
                        car.stopTurning();
                    }
                    break;
                case 39: //RIGHT
                    if (car.rotate > 0) {
                        car.stopTurning();
                    }
                    break;
            }
        });
    }
}