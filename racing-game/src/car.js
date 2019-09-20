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

        this.speed = 0.8;
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
        this.pos.x += (this.speed * this.mod) * Math.cos(Math.PI / 180 * (this.angle += this.rotate)) * deltaTime;
        this.pos.y += (this.speed * this.mod) * Math.sin(Math.PI / 180 * (this.angle += this.rotate)) * deltaTime;
    }
}


function keyUp_handler(e, car) {
    switch (e.keyCode) {
        case 38: //UP
        case 40: //DOWN
            car.mod = 0;
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
            car.mod = 1;
            break;

        case 40: //DOWN
            car.mod = -1;
            break;

        case 37: //LEFT
            car.rotate = -3;
            break;

        case 39: //RIGHT
            car.rotate = 3;
            break;
    }
}