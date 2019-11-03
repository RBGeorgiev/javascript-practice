export class CarControls {
    constructor(car) {
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

export class GameOptions {
    constructor(game) {
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 13: // Enter
                    game.init();
                    break;

                case 32: // Space
                    game.paused = !game.paused
                    break;

                case 82: // 'R'                    
                    game.cars = [];
                    break;
            }
        });
    }
}