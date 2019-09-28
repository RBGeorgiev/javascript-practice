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

        this.track = [
            ...this.map.map.outerLines,
            ...this.map.map.innerLines
        ];

        this.crash = false;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fill();

        this.map.draw(ctx);
        this.car.draw(ctx, this.crash);
        this.drawSensorCollisions(ctx);
    }

    update(deltaTime) {
        this.car.update(deltaTime);
        this.SensorTrackCollision();
        this.carTrackCollision();
    }

    SensorTrackCollision() {
        let sens = this.car.sensors,
            track = this.track,
            ans = [];

        // loop through each sensor
        for (let i = 0; i < sens.length; i++) {
            let collisions = [];

            // find all collisions with sensor
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

            // find closest collision
            let closest = [Infinity, null];

            for (let k = 0; k < collisions.length; k++) {
                // find distance length from start of sensor to collision
                let sensX = sens[i].x1,
                    sensY = sens[i].y1,
                    colX = collisions[k].x,
                    colY = collisions[k].y,

                    x = Math.pow(colX - sensX, 2),
                    y = Math.pow(colY - sensY, 2),

                    tot = Math.pow((x + y), 1 / 2);

                // if distance is shorter than prev shortest distance
                if (tot < closest[0]) {
                    closest[0] = tot
                    closest[1] = { x: collisions[k].x, y: collisions[k].y }
                }
            }
            ans.push(closest[1])
        }
        this.collisions = ans;
    }

    drawSensorCollisions(ctx) {
        let collisions = this.collisions,
            sens = this.car.sensors[0];

        for (let i = 0; i < collisions.length; i++) {
            // Short-circuit evaluation fixes a game breaking error where collisions[i] returned null
            let col = collisions[i] || sens,
                x = col.x,
                y = col.y;

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = 'white'
            ctx.font = "10px Arial";
            ctx.fillText(`x: ${Math.round(x - sens.x1)}, y: ${Math.round(y - sens.y1)}`, x + 5, y - 5)
        }
    }

    carTrackCollision() {
        let carSides = this.car.sides,
            track = this.track;

        for (let i = 0; i < carSides.length; i++) {
            for (let j = 0; j < track.length; j++) {
                let crash = lineCollision(
                    carSides[i].x1,
                    carSides[i].y1,
                    carSides[i].x2,
                    carSides[i].y2,
                    track[j].x1,
                    track[j].y1,
                    track[j].x2,
                    track[j].y2,
                )

                if (crash) return this.crash = true;
            }
        }
        return this.crash = false;
    }
}