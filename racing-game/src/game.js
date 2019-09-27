import Car from './car.js';
import Map from './map-draw.js';
import lineCollision from './collision.js'


export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.car = new Car(this);
        this.map = new Map;

        this.collisions = [];
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.map.draw(ctx);
        this.car.draw(ctx);
        this.drawCollisions(ctx)
        // console.log(this.collisions)
    }

    update(deltaTime) {
        this.car.update(deltaTime);
        this.SensorTrackCollision();
    }

    SensorTrackCollision() {
        let sens = this.car.sensors,
            outer = this.map.map.outerLines,
            inner = this.map.map.innerLines,
            ans = [];

        for (let i = 0; i < sens.length; i++) {
            for (let j = 0; j < outer.length; j++) {
                let cur = lineCollision(
                    sens[i].x1,
                    sens[i].y1,
                    sens[i].x2,
                    sens[i].y2,
                    outer[j].x1,
                    outer[j].y1,
                    outer[j].x2,
                    outer[j].y2
                )
                if (cur) ans.push(cur)
            }
            for (let k = 0; k < inner.length; k++) {
                let cur = lineCollision(
                    sens[i].x1,
                    sens[i].y1,
                    sens[i].x2,
                    sens[i].y2,
                    inner[k].x1,
                    inner[k].y1,
                    inner[k].x2,
                    inner[k].y2
                )
                if (cur) ans.push(cur)
            }
        }
        this.collisions = ans;
    }

    drawCollisions(ctx) {
        let collisions = this.collisions
        for (let i = 0; i < collisions.length; i++) {
            ctx.beginPath();
            ctx.arc(collisions[i].x, collisions[i].y, 3, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}