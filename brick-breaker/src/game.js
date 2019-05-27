import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import levelLoader from "./level-loader.js";
import levels from "./levels.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.levels = levels;

        this.init();
    }

    init() {
        this.currentLevel = 0;
        this.lives = 3;
        this.score = 0;
        this.paused = false;
        this.won = false;
        this.lost = false;

        this.startLevel();
    }

    startLevel() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = [];

        new InputHandler(this.paddle, this);

        levelLoader(this, this.levels[this.currentLevel]);
    }

    togglePause() {
        if (this.won || this.lost) return;
        this.paused = !this.paused;
    }

    update(deltaTime) {
        if (this.paused || this.won || this.lost) return;
        this.paddle.update(deltaTime);
        this.ball.update(deltaTime);

        // check brick collision
        this.bricks.forEach(brick => brick.update());
    }

    draw(ctx) {
        this.paddle.draw(ctx);
        this.ball.draw(ctx);

        // draw bricks
        this.bricks.forEach(brick => brick.draw(ctx));

        this.displayScore(ctx);

        // game pause overlay
        if (this.paused) {
            this.pauseScreen(ctx);
        }

        // next level check and game win overlay
        if (this.bricks.length === 0) {
            // if there is a next level
            if (this.currentLevel + 1 < this.levels.length) {
                // startLevel next level
                this.currentLevel++;
                this.startLevel();
                return;
            }
            this.won = true;
            this.winScreen(ctx);
        }

        // game lose overlay
        if (this.lives === 0) {
            this.lost = true;
            this.gameOverScreen(ctx);
        }
    }

    displayScore(ctx) {
        ctx.font = '40px serif';
        ctx.textAlign = "center"
        ctx.fillText(`${this.score}`, this.gameWidth - ctx.measureText(`${this.score}`).width / 2 - 20, 45)
    }

    pauseScreen(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = '50px serif';
        ctx.textAlign = "center"
        ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2)
    }

    winScreen(ctx) {
        ctx.fillStyle = "rgba(0, 55, 0, 0.6)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = '50px serif';
        ctx.textAlign = "center"
        ctx.fillText("YOU WON", this.gameWidth / 2, this.gameHeight / 2)
    }

    gameOverScreen(ctx) {
        ctx.fillStyle = "rgba(55, 0, 0, 0.6)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = '50px serif';
        ctx.textAlign = "center";
        ctx.fillText("YOU LOST", this.gameWidth / 2, this.gameHeight / 2);
    }
}