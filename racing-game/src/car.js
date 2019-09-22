export default class Car {
    constructor(game) {
        this.size = {
            width: 40,
            height: 20
        };

        this.game = game;

        this.pos = {
            x: (this.game.gameWidth - this.size.width) / 2,
            y: (this.game.gameHeight - this.size.height) / 2
        }

        this.maxSpeed = 100
        this.speed = 0;
        this.acc = 0;

        this.mod = 0;
        this.angle = 0;
        this.rotate = 0
        this.moving = 0

        this.maxDrift = 14
        this.drift = 0
        this.driftAngle = 0

        document.addEventListener('keydown', (e) => keyDown_handler(e, this));
        document.addEventListener('keyup', (e) => keyUp_handler(e, this));
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.pos.x + this.size.width / 2, this.pos.y + this.size.height / 2);
        ctx.rotate(this.applyDrift() + this.angle * Math.PI / 180);
        ctx.rect(-this.size.width, -this.size.height / 2, this.size.width, this.size.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.restore();
    }

    update(deltaTime) {
        (this.speed === 0) ? this.moving = 0 : this.moving = 1;
        this.resetDrift();
        this.pos.x += (this.applyAcc() * this.mod) * Math.cos(Math.PI / 180 * (this.angle += this.rotate * this.moving)) * deltaTime;
        this.pos.y += (this.applyAcc() * this.mod) * Math.sin(Math.PI / 180 * (this.angle += this.rotate * this.moving)) * deltaTime;
    }

    applyAcc() {
        this.speed += this.acc;
        this.speed = this.clamp(this.speed, 0, this.maxSpeed);
        return this.speed / 100;
    }

    applyDrift() {
        this.drift += this.driftAngle * this.moving;
        this.drift = this.clamp(this.drift, -this.maxDrift, this.maxDrift);
        return this.drift / 10;
    }

    resetDrift() {
        if (this.rotate === 0) {
            if (this.drift > 0) {
                this.driftAngle = -1;
            } else if (this.drift < 0) {
                this.driftAngle = 1;
            } else if (this.drift === 0) {
                this.driftAngle = 0;
            }
        }
    }

    clamp(number, min, max) {
        // caps min and max speed
        return Math.max(min, Math.min(number, max));
    }
}


function keyUp_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
        case 40: //DOWN
            (car.acc > 0) ? car.acc = -1 : car.mod = 0;
            break;
        case 37:
            if (car.rotate < 0) {
                car.rotate = 0;
                car.driftAngle = 0;
            }
            break;
        case 39:
            if (car.rotate > 0) {
                car.rotate = 0;
                car.driftAngle = 0;
            }
            break;
    }
}

function keyDown_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
            if (car.mod !== -1) {
                car.mod = 1;
                car.acc = 1;
            }
            break;

        case 40: //DOWN
            if (car.mod !== 1) {
                car.mod = -1;
                car.acc = 1;
            }
            break;

        case 37: //LEFT
            car.rotate = -3;
            car.driftAngle = -1;
            break;

        case 39: //RIGHT
            car.rotate = 3;
            car.driftAngle = 1;
            break;
    }
}