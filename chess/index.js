function initBoard(squareSize) {
    let board = document.getElementsByClassName("board");

    board[0].style.width = `${squareSize * 8}px`;
    board[0].style.height = `${squareSize * 8}px`;

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let square = document.createElement("div");

            let className = "square";
            if ((x + y) % 2 === 0) className += " sqBlack";
            square.className = className;

            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;

            board[0].appendChild(square);
        }
    }
}

initBoard(70)