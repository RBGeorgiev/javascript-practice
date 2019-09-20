import Car from './car.js';

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.car = new Car(this);

        document.addEventListener('keydown', (e) => keyDown_handler(e, this.car))
        document.addEventListener('keyup', (e) => keyUp_handler(e, this.car))
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.car.draw(ctx)
    }

    update(deltaTime) {
        this.car.update(deltaTime);
    }
}

function keyUp_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
        case 40: //DOWN
            car.mod = 0;
    }
}

function keyDown_handler(e, car) {
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 38: //UP
            car.mod = -1;
            break;

        case 40: //DOWN
            car.mod = 1;
            break;

        case 37: //LEFT
            car.angle -= 15;
            break;

        case 39: //RIGHT
            car.angle += 15;
            break;
    }
}