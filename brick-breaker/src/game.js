import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import levelLoader from "./level-loader.js";
import levels from "./levels.js";

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        new InputHandler(this.paddle, this);

        this.levels = levels;

        this.init();
    }

    init() {
        this.currentLevel = 0;
        this.lives = 3;
        this.score = 0;
        this.bricks = [];

        this.paused = false;
        this.won = false;
        this.lost = false;

        this.startLevel();
    }

    startLevel() {
        levelLoader(this, this.levels[this.currentLevel]);
        this.ball.resetBall();
        this.paddle.resetPaddle();
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

        this.startScreen(ctx);

        this.displayScore(ctx);

        this.displayLives(ctx);

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

    startScreen(ctx) {
        if (this.ball.waitingToStart && this.lives !== 0 && !this.paused) {
            ctx.font = '50px sans-serif';
            ctx.textAlign = "center";

            ctx.fillStyle = "red";
            ctx.fillText(`Level ${this.currentLevel + 1}`, this.gameWidth / 2, this.gameHeight / 2 - 50);

            ctx.font = '25px sans-serif';
            ctx.fillStyle = "blue";
            ctx.fillText(`Press Up Arrow key to Start`, this.gameWidth / 2, this.gameHeight / 2);

            ctx.fillStyle = "red";
            ctx.fillText(`Press Enter to Restart the game`, this.gameWidth / 2, this.gameHeight / 2 + 50);
        }
    }

    displayLives(ctx) {
        ctx.fillStyle = "red";
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(`Lives: ${this.lives}`, ctx.measureText(`Lives: ${this.score}`).width - 30, 40);
    }

    displayScore(ctx) {
        ctx.font = '30px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(`Score: ${this.score}`, this.gameWidth - ctx.measureText(`Score: ${this.score}`).width / 2 - 20, 40);
    }

    pauseScreen(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        ctx.font = '50px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    winScreen(ctx) {
        ctx.fillStyle = "rgba(0, 55, 0, 0.8)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        ctx.textAlign = "center";

        ctx.font = '50px sans-serif';
        ctx.fillStyle = "white";
        ctx.fillText("YOU WON", this.gameWidth / 2, this.gameHeight / 2);

        ctx.font = '30px sans-serif';
        ctx.fillStyle = "lightgrey";
        ctx.fillText(`Final score: ${this.score}`, this.gameWidth / 2, this.gameHeight / 2 - 65);

        ctx.fillText("Press Enter to play again", this.gameWidth / 2, this.gameHeight / 2 + 50);
    }

    gameOverScreen(ctx) {
        ctx.fillStyle = "rgba(55, 0, 0, 0.9)";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        ctx.textAlign = "center";

        ctx.font = '50px sans-serif';
        ctx.fillStyle = "white";
        ctx.fillText("YOU LOST", this.gameWidth / 2, this.gameHeight / 2);

        ctx.font = '30px sans-serif';
        ctx.fillStyle = "lightgrey";
        ctx.fillText(`Final score: ${this.score}`, this.gameWidth / 2, this.gameHeight / 2 - 65);

        ctx.fillText("Press Enter to play again", this.gameWidth / 2, this.gameHeight / 2 + 50);
    }


}