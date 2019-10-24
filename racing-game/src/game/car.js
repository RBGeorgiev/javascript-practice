import lineCollision from './collision.js';
import { drawAxisCheckbox, drawVerticesCheckbox, drawSidesCheckbox, drawSensorsCheckbox, drawSensorCollisionsCheckbox } from '../constants.js';
import { image, drawCar } from '../../index.js'

export default class Car {
    constructor(game, genome) {
        this.size = {
            width: 20,
            height: 10
        };

        this.game = game;

        this.pos = {
            x: 357,
            y: 130,
        }

        this.positionCar();

        this.maxSpeed = 100
        this.speed = 0;
        this.acc = 0;
        this.mod = 0;

        this.angle = 0;
        this.rotate = 0;
        this.moving = 0;
        this.crashed = false;

        this.initBrain(genome);
    }

    positionCar() {
        this.axis = {
            x: this.pos.x + this.size.width / 2,
            y: this.pos.y + this.size.height / 2
        }

        this.positionVertices();
        this.positionSides()
        this.positionSensors();
    }

    initBrain(genome) {
        this.sensorCollisions = [];
        this.sensorDistToCol = [];

        this.timeImmobile = 0;
        this.lastGatePassed = 0;
        this.lap = 0

        this.brain = genome;
        this.brain.score = 0;

        this.brain.inputs = [];
        this.brain.outputs = this.brain.activate(this.brain.inputs);
    }

    getInputs() {
        let ans = []
        for (let i = 0; i < this.sensorDistToCol.length; i++) {
            ans.push(this.sensorDistToCol[i] / 500);
        }
        ans.push(this.speed / 100)
        this.brain.inputs = ans;
    }

    getOutputs() {
        this.brain.outputs = this.brain.activate(this.brain.inputs);
    }

    moveAxis(deltaTime) {
        this.angle += this.rotate * this.moving;
        let acceleration = this.applyAcc() * this.mod;

        this.axis.x += acceleration * Math.cos(Math.PI / 180 * this.angle) * deltaTime;
        this.axis.y += acceleration * Math.sin(Math.PI / 180 * this.angle) * deltaTime;
    }

    drawAxis(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.rect(this.axis.x, this.axis.y, 1, 1);
        ctx.stroke();
    }

    positionSides() {
        let vert = this.vertices
        this.sides = [
            {
                x1: vert[1].x, // top left
                y1: vert[1].y,
                x2: vert[2].x, // top right
                y2: vert[2].y
            },
            {
                x1: vert[2].x, // top right
                y2: vert[2].y,
                x2: vert[3].x, // bottom right
                y2: vert[3].y
            },
            {
                x1: vert[3].x, // bottom right
                y1: vert[3].y,
                x2: vert[4].x, // bottom left
                y2: vert[4].y
            },
            {
                x1: vert[4].x, // bottom left
                y1: vert[4].y,
                x2: vert[1].x, // top left
                y2: vert[1].y
            },

        ]
    }

    drawSides(ctx) {
        let sides = this.sides
        for (let i = 0; i < sides.length; i++) {
            ctx.moveTo(sides[i].x1, sides[i].y1)
            ctx.lineTo(sides[i].x2, sides[i].y2)
        }
        ctx.stroke()
    }

    positionVertices() {
        this.vertices = [
            // center
            {
                x: this.axis.x - this.size.width / 2,
                y: this.axis.y
            },
            // top left
            {
                x: this.axis.x - this.size.width,
                y: this.axis.y - this.size.height / 2
            },
            // top right
            {
                x: this.axis.x,
                y: this.axis.y - this.size.height / 2
            },
            // bottom right
            {
                x: this.axis.x,
                y: this.axis.y + this.size.height / 2
            },
            // bottom left
            {
                x: this.axis.x - this.size.width,
                y: this.axis.y + this.size.height / 2
            }
        ];
    }

    rotateVertices() {
        let theta = Math.PI / 180 * this.angle;
        let cx = this.axis.x;
        let cy = this.axis.y;

        for (let i = 0; i < this.vertices.length; i++) {
            let x = this.vertices[i].x;
            let y = this.vertices[i].y;
            // cx, cy - center of square coordinates
            // x, y - coordinates of a corner point of the square
            // theta is the angle of rotation

            // translate point to origin
            let tempX = x - cx;
            let tempY = y - cy;

            // now apply rotation
            let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
            let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

            // translate back
            this.vertices[i].x = rotatedX + cx;
            this.vertices[i].y = rotatedY + cy;
        }
    }

    drawVertices(ctx) {
        const vert = this.vertices;
        ctx.beginPath();

        for (let i = 0; i < vert.length; i++) {
            ctx.rect(vert[i].x, vert[i].y, 1, 1);
        }
        ctx.stroke();
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    positionSensors() {
        const sensRadius = 500;
        const radian = (deg) => this.degreesToRadians(deg)
        // const center = this.vertices[0];
        const topLeft = this.vertices[1];
        const topRight = this.vertices[2];
        const botRight = this.vertices[3];
        const botLeft = this.vertices[4];

        this.sensors = [
            // top
            {
                x1: topRight.x,
                y1: topRight.y,
                x2: topRight.x,
                y2: topRight.y - sensRadius
            },
            // right
            {
                x1: this.axis.x,
                y1: this.axis.y,
                x2: this.axis.x + sensRadius,
                y2: this.axis.y + this.size.height / 2
            },
            // bottom
            {
                x1: botRight.x,
                y1: botRight.y,
                x2: botRight.x,
                y2: botRight.y + sensRadius
            },
            // top right
            {
                x1: topRight.x,
                y1: topRight.y,
                x2: topRight.x + sensRadius * Math.cos(radian(30)),
                y2: topRight.y + sensRadius * Math.sin(-radian(30))
            },
            {
                x1: topRight.x,
                y1: topRight.y,
                x2: topRight.x + sensRadius * Math.cos(radian(60)),
                y2: topRight.y + sensRadius * Math.sin(-radian(60))
            },

            // top left
            {
                x1: topLeft.x,
                y1: topLeft.y,
                x2: topLeft.x - sensRadius * Math.cos(radian(45)),
                y2: topLeft.y - sensRadius * Math.sin(radian(45))
            },
            // bottom right           
            {
                x1: botRight.x,
                y1: botRight.y,
                x2: botRight.x + sensRadius * Math.cos(radian(30)),
                y2: botRight.y + sensRadius * Math.sin(radian(30))
            },
            {
                x1: botRight.x,
                y1: botRight.y,
                x2: botRight.x + sensRadius * Math.cos(radian(60)),
                y2: botRight.y + sensRadius * Math.sin(radian(60))
            },
            // bottom left
            {
                x1: botLeft.x,
                y1: botLeft.y,
                x2: botLeft.x - sensRadius * Math.cos(radian(45)),
                y2: botLeft.y - sensRadius * Math.sin(-radian(45))
            },
        ];
    }

    rotateSensors() {
        let theta = Math.PI / 180 * this.angle;
        let cx = this.axis.x;
        let cy = this.axis.y;

        for (let i = 0; i < this.sensors.length; i++) {
            let x = this.sensors[i].x2;
            let y = this.sensors[i].y2;
            // cx, cy - center of square coordinates
            // x, y - coordinates of a corner point of the square
            // theta is the angle of rotation

            // translate point to origin
            let tempX = x - cx;
            let tempY = y - cy;

            // now apply rotation
            let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
            let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

            // translate back
            this.sensors[i].x2 = rotatedX + cx;
            this.sensors[i].y2 = rotatedY + cy;
        }
    }


    drawSensors(ctx) {
        const sens = this.sensors;
        ctx.beginPath();

        for (let i = 0; i < this.sensors.length; i++) {
            ctx.moveTo(sens[i].x1, sens[i].y1);
            ctx.lineTo(sens[i].x2, sens[i].y2);
        }
        ctx.stroke();
    }

    draw(ctx) {
        drawCar(image, this.axis.x, this.axis.y, this.size.height / image.width, this.size.width / image.height, this.size.width, this.size.height, this.degreesToRadians(this.angle) + Math.PI / 2);
        if (drawAxisCheckbox.checked) this.drawAxis(ctx);
        ctx.beginPath();
        (this.crashed) ? ctx.strokeStyle = "red" : ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        if (drawVerticesCheckbox.checked) this.drawVertices(ctx)
        if (drawSensorsCheckbox.checked) this.drawSensors(ctx);
        if (drawSensorCollisionsCheckbox.checked) this.drawSensorCollisions(ctx);
        if (drawSidesCheckbox.checked) this.drawSides(ctx);
    }

    update(deltaTime) {
        const map = this.game.map;

        // if immobile add to timer
        (this.speed === 0) ? this.timeImmobile += deltaTime : this.timeImmobile = 0;
        // if spinning in place add to timer
        (this.rotate !== 0) ? this.timeSpinning += deltaTime : this.timeSpinning = 0;

        // if immobile or spinning for too long crash the car and give lower score
        if (this.timeImmobile > 1000 || this.timeSpinning > 3000) {
            this.brain.score = this.lastGatePassed * 1000 * this.lap;
            this.crashed = true;
        }

        // set to 0 if car is immobile to stop it from turning in place
        (this.speed === 0) ? this.moving = 0 : this.moving = 1;

        if (this.crashed) return;
        // update car position
        this.moveAxis(deltaTime);
        this.positionVertices();
        this.rotateVertices();
        this.positionSensors();
        this.rotateSensors();
        this.positionSides();

        // check collisions
        this.outOfCanvasCheck();
        this.sensorTrackCollision(map.track);
        this.carTrackCollision(map.track);
        this.carGatesCollision(map.gates);

        // inputs and outputs for neural network
        this.getInputs();
        this.getOutputs()

        // the faster the car is moving the bigger score it will get
        this.brain.score += this.speed / 4;

        // move based on neural network outputs
        if (this.brain.outputs[0] < 0)
            this.stopMoving();
        if (this.brain.outputs[0] > 0)
            this.moveForward();

        if (this.brain.outputs[1] < -0.6)
            this.stopTurning();
        if (this.brain.outputs[1] > -0.6 && this.brain.outputs[0] < 0.3)
            this.turnRight();
        if (this.brain.outputs[1] > 0.3)
            this.turnLeft();
    }

    applyAcc() {
        this.speed += this.acc;
        this.speed = this.clamp(this.speed, 0, this.maxSpeed);
        return this.speed / 100;
    }

    clamp(number, min, max) {
        // caps min and max speed
        return Math.max(min, Math.min(number, max));
    }

    outOfCanvasCheck() {
        const vert = this.vertices,
            gameWidth = this.game.gameWidth,
            gameHeight = this.game.gameHeight;
        for (let i = 0; i < vert.length; i++) {
            const x = vert[i].x,
                y = vert[i].y;

            if (x < 0 || x > gameWidth ||
                y < 0 || y > gameHeight) {
                this.brain.score = 0;
                this.crashed = true;
            }
        }
    }

    carGatesCollision(gates) {
        const carSides = this.sides;

        for (let i = 0; i < carSides.length; i++) {
            for (let j = 0; j < gates.length; j++) {
                let collide = lineCollision(
                    carSides[i].x1,
                    carSides[i].y1,
                    carSides[i].x2,
                    carSides[i].y2,
                    gates[j].x1,
                    gates[j].y1,
                    gates[j].x2,
                    gates[j].y2,
                )
                if (collide) {
                    // debugger;
                    const id = gates[j].id;
                    if (this.lastGatePassed === id || this.lastGatePassed - (this.lap * (gates.length - 1)) === id) return;
                    if (this.lastGatePassed - (this.lap * (gates.length - 1)) === id - 1) {
                        // if passing gates in order      
                        this.lastGatePassed++;
                        this.brain.score += 1000;

                        // if passing through last gate
                        if (gates[gates.length - 1].id === this.lastGatePassed) {
                            this.lap++;
                            this.brain.score += 5000;
                            this.game.timer = 0;
                        }
                    } else {
                        this.brain.score = 0;
                        this.crashed = true;
                    }
                }
            }
        }
    }

    carTrackCollision(track) {
        const carSides = this.sides;

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

                if (crash) return this.crashed = true;
            }
        }
        return this.crashed = false;
    }

    sensorTrackCollision(track) {
        let sens = this.sensors,
            dist = [],
            sensCol = [];

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
            dist.push(closest[0]);
            sensCol.push(closest[1]);
        }
        this.sensorDistToCol = dist;
        this.sensorCollisions = sensCol;
    }

    drawSensorCollisions(ctx) {
        let collisions = this.sensorCollisions,
            sens = this.sensors[0];

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

    moveForward() {
        if (this.mod !== -1) {
            this.mod = 1;
            this.acc = 1;
        }
    }

    moveBack() {
        if (this.mod !== 1) {
            this.mod = -1;
            this.acc = 1;
        }
    }

    stopMoving() {
        (this.acc > 0) ? this.acc = -1 : this.mod = 0;
    }

    turnLeft() {
        this.rotate = -5;
    }

    turnRight() {
        this.rotate = 5;
    }

    stopTurning() {
        this.rotate = 0;
    }
}