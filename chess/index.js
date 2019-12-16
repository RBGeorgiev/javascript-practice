import Game from './src/game.js';

let startGame = (squareSize) => {
    // default squareSize is 70
    let game = new Game(squareSize);
    game.init();
}

document.onload = startGame();