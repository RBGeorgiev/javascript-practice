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

        this.squares = document.getElementsByClassName("square");

        this.pieceElem = document.createElement("div");

        this.positionPiece();
    }

    setIsTaken = () => this.setIsTaken = true;

    positionPiece = () => {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.pos.x === this.squares[i].pos.x
                &&
                this.pos.y === this.squares[i].pos.y) {
                let pieceElem = this.pieceElem;
                pieceElem.className = `piece ${this.type} ${this.color}`;

                pieceElem.innerHTML = `${this.color} ${this.type}`;

                this.squares[i].appendChild(pieceElem);
            }
        }
    }

    getAvailableMoves() {
        let availableMoves = [];
        for (let i = 0; i < this.squares.length; i++) {
            for (let j = 0; j < this.moves.length; j++) {
                if (this.moves[j].x === this.squares[i].pos.x
                    &&
                    this.moves[j].y === this.squares[i].pos.y) {
                    availableMoves.push(this.squares[i]);
                }
            }
        }
        return availableMoves;
    }

    clearColorMoves() {
        for (const square of this.availableMoves) {
            square.style.background = "";
        }
    }

    colorMoves() {
        for (const square of this.availableMoves) {
            square.style.background = "green";
        }
    }
}

class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "king");

        this.pieceElem.piece = this;

        this.moves = this.moves();
        this.availableMoves = this.getAvailableMoves();
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        return [
            {
                x: x - 1,
                y: y
            },
            {
                x: x + 1,
                y: y
            },
            {
                x: x,
                y: y - 1
            },
            {
                x: x,
                y: y + 1
            },

            {
                x: x - 1,
                y: y + 1
            },
            {
                x: x - 1,
                y: y - 1
            },
            {
                x: x + 1,
                y: y - 1
            },
            {
                x: x + 1,
                y: y + 1
            },
        ]
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

document.addEventListener("mousedown", e => e.target.piece.colorMoves());
document.addEventListener("mouseup", e => e.target.piece.clearColorMoves());