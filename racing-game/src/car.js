export default class Car {
    constructor(game) {
        this.size = {
            width: 20,
            height: 10
        };

        this.game = game;

        this.pos = {
            x: (this.game.gameWidth - this.size.width) / 2,
            y: (this.game.gameHeight - this.size.height) / 2
        }

        this.maxSpeed = 1
        this.speed = 0;
        this.acc = 0;

        this.mod = 0;
        this.angle = 0;
        this.rotate = 0

        document.addEventListener('keydown', (e) => keyDown_handler(e, this))
        document.addEventListener('keyup', (e) => keyUp_handler(e, this))
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pos.x + this.size.width / 2, this.pos.y + this.size.height / 2);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.rect(-this.size.width, -this.size.height / 2, this.size.width, this.size.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
    }

    update(deltaTime) {
        this.pos.x += (this.applyAcc() * this.mod) * Math.cos(Math.PI / 180 * (this.angle += this.rotate)) * deltaTime;
        this.pos.y += (this.applyAcc() * this.mod) * Math.sin(Math.PI / 180 * (this.angle += this.rotate)) * deltaTime;
    }

    applyAcc() {
        this.speed += this.acc;
        this.speed = this.speedClamp(this.speed, 0, this.maxSpeed)
        return this.speed;
    }

    speedClamp(number, min, max) {
        // caps min and max speed
        return Math.max(min, Math.min(number, max));
    }
}


function keyUp_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
        case 40: //DOWN
            (car.acc > 0) ? car.acc = -0.02 : car.mod = 0;
            break;
        case 37:
            if (car.rotate < 0) car.rotate = 0;
            break;
        case 39:
            if (car.rotate > 0) car.rotate = 0;
            break;

    }
}

function keyDown_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
            if (car.mod !== -1) {
                car.mod = 1;
                car.acc = 0.01
            }
            break;

        case 40: //DOWN
            if (car.mod !== 1) {
                car.mod = -1;
                car.acc = 0.01;
            }
            break;

        case 37: //LEFT
            car.rotate = -3;
            break;

        case 39: //RIGHT
            car.rotate = 3;
            break;
    }
}