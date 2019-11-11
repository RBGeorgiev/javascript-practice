function initBoard(squareSize) {
    let board = document.getElementsByClassName("board");

    board[0].style.width = `${squareSize * 8}px`;
    board[0].style.height = `${squareSize * 8}px`;

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let square = document.createElement("div");

            let className = "square";
            if ((x + y) % 2 === 0) className += " sqBlack";
            square.className = className;

            square.pos = {
                x: x,
                y: y
            }

            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;

            board[0].appendChild(square);
        }
    }
}

class Piece {
    constructor(x, y, color, type) {
        this.pos = {
            x,
            y
        }
        this.color = color;
        this.type = type;
        this.taken = false;

        this.sqaures = document.getElementsByClassName("square");

        this.positionPiece();
    }

    setIsTaken = () => this.setIsTaken = true;

    positionPiece = () => {
        for (let i = 0; i < this.sqaures.length; i++) {
            if (this.pos.x === this.sqaures[i].pos.x
                &&
                this.pos.y === this.sqaures[i].pos.y) {
                let piece = document.createElement("div");
                piece.className = `piece ${this.type} ${this.color}`;
                piece.innerHTML = `${this.color} ${this.type}`;

                this.sqaures[i].appendChild(piece);
            }
        }
    }
}

class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "king");
    }
}
class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "queen");
    }
}
class Rook extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "rook");
    }
}
class Bishop extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "bishop");
    }
}
class Knight extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "knight");
    }
}
class Pawn extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "pawn");
    }
}

function initPieces() {
    // white
    for (let i = 0; i < 8; i++) {
        new Pawn(i, 1, "white");
    }
    new Rook(0, 0, "white");
    new Knight(1, 0, "white");
    new Bishop(2, 0, "white");
    new Queen(3, 0, "white");
    new King(4, 0, "white");
    new Bishop(5, 0, "white");
    new Knight(6, 0, "white");
    new Rook(7, 0, "white");

    // black
    for (let i = 0; i < 8; i++) {
        new Pawn(i, 6, "black");
    }
    new Rook(0, 7, "black");
    new Knight(1, 7, "black");
    new Bishop(2, 7, "black");
    new Queen(3, 7, "black");
    new King(4, 7, "black");
    new Bishop(5, 7, "black");
    new Knight(6, 7, "black");
    new Rook(7, 7, "black");
}

initBoard(70);
initPieces();