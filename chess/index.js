import Game from './src/game.js';

let startGame = () => {
    let game = new Game;
    game.init();
}

document.onload = startGame();