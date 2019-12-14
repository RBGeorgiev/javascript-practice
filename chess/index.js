import Game from './game.js';

let startGame = () => {
    let game = new Game;
    game.init();
}

document.onload = startGame();