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
    }

    update(deltaTime) {
        this.car.update(deltaTime);
        this.SensorTrackCollision();
    }

    SensorTrackCollision() {
        let sens = this.car.sensors,
            outer = this.map.map.outerLines,
            inner = this.map.map.innerLines,
            track = [...outer, ...inner],
            ans = [];

        for (let i = 0; i < sens.length; i++) {
            let collisions = [];
            for (let j = 0; j < track.length; j++) {
                let cur = lineCollision(
                    sens[i].x1,
                    sens[i].y1,
                    sens[i].x2,
                    sens[i].y2,
                    track[j].x1,
                    track[j].y1,
                    track[j].x2,
                    track[j].y2
                )
                if (cur) collisions.push(cur)
            }


            let closest = [Infinity, null];

            let sensX = sens[i].x1
            let sensY = sens[i].y1
            for (let k = 0; k < collisions.length; k++) {
                let x = collisions[k].x - sensX
                let y = collisions[k].y - sensY

                x = Math.pow(x, 2)
                y = Math.pow(y, 2)
                let tot = Math.pow((x + y), 1 / 2)

                if (closest[0] > tot) {
                    closest[0] = tot
                    closest[1] = { x: collisions[k].x, y: collisions[k].y }
                }
            }
            ans.push(closest[1])
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