let boardSize = 8;
let squareSize = 70;
let allPieces = [];

function initBoard(squareSize) {
    let board = document.getElementsByClassName("board");


    board[0].style.width = `${squareSize * boardSize}px`;
    board[0].style.height = `${squareSize * boardSize}px`;

    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
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
        this.allPieces = allPieces;

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

        this.moves;
        this.availableMoves;
        this.collisions;
    }

    getMoves() {
        this.moves = this.moves();
        this.availableMoves = this.getAvailableMoves();
        this.collisions = this.getCollisions();
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

    getCollisions() {
        let collisions = [];

        for (let i = 0; i < this.availableMoves.length; i++) {
            for (let j = 0; j < this.allPieces.length; j++) {
                if (this.allPieces[j].pos.x === this.availableMoves[i].pos.x
                    &&
                    this.allPieces[j].pos.y === this.availableMoves[i].pos.y)
                    collisions.push(this.availableMoves[i]);
            }
        }

        return collisions;
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

        this.hasMoved = false;

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [
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
            }
        ]

        return moves;
    }
}

class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "queen");

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [];

        for (let idx = 0; idx < boardSize; idx++) {
            moves.push(

                {
                    x: idx,
                    y: y
                },
                {
                    x: x,
                    y: idx
                },
                {
                    x: x + idx,
                    y: y + idx
                },
                {
                    x: x - idx,
                    y: y + idx
                },
                {
                    x: x + idx,
                    y: y - idx
                },
                {
                    x: x - idx,
                    y: y - idx
                }
            )
        }

        return moves;
    }
}

class Rook extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "rook");

        this.hasMoved = false;

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [];

        for (let idx = 0; idx < boardSize; idx++) {
            moves.push(
                {
                    x: idx,
                    y: y
                },
                {
                    x: x,
                    y: idx
                }
            )
        }

        return moves;
    }
}

class Bishop extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "bishop");

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [];

        for (let idx = 0; idx < boardSize; idx++) {
            moves.push(
                {
                    x: x + idx,
                    y: y + idx
                },
                {
                    x: x - idx,
                    y: y + idx
                },
                {
                    x: x + idx,
                    y: y - idx
                },
                {
                    x: x - idx,
                    y: y - idx
                }
            )
        }

        return moves;
    }
}
class Knight extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "knight");

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [
            {
                x: x + 2,
                y: y - 1
            },
            {
                x: x + 2,
                y: y + 1
            },
            {
                x: x - 2,
                y: y - 1
            },
            {
                x: x - 2,
                y: y + 1
            },
            {
                x: x + 1,
                y: y + 2
            },
            {
                x: x - 1,
                y: y + 2
            },
            {
                x: x + 1,
                y: y - 2
            },
            {
                x: x - 1,
                y: y - 2
            }
        ]

        return moves;
    }
}

class Pawn extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "pawn");

        this.hasMoved = false;

        this.direction = (this.color === "white") ? 1 : -1;

        this.pieceElem.piece = this;
    }

    moves() {
        let x = this.pos.x;
        let y = this.pos.y;

        let moves = [];

        (this.hasMoved)
            ?
            moves.push({
                x: x,
                y: y + 1 * this.direction
            })
            :
            moves.push(
                {
                    x: x,
                    y: y + 1 * this.direction
                },
                {
                    x: x,
                    y: y + 2 * this.direction
                });

        return moves;
    }
}



function initPieces() {
    // white
    for (let i = 0; i < boardSize; i++) {
        allPieces.push(new Pawn(i, 1, "white"));
    }
    allPieces.push(new Rook(0, 0, "white"));
    allPieces.push(new Knight(1, 0, "white"));
    allPieces.push(new Bishop(2, 0, "white"));
    allPieces.push(new Queen(3, 0, "white"));
    allPieces.push(new King(4, 0, "white"));
    allPieces.push(new Bishop(5, 0, "white"));
    allPieces.push(new Knight(6, 0, "white"));
    allPieces.push(new Rook(7, 0, "white"));

    // black
    for (let i = 0; i < boardSize; i++) {
        allPieces.push(new Pawn(i, 6, "black"));
    }
    allPieces.push(new Rook(0, 7, "black"));
    allPieces.push(new Knight(1, 7, "black"));
    allPieces.push(new Bishop(2, 7, "black"));
    allPieces.push(new Queen(3, 7, "black"));
    allPieces.push(new King(4, 7, "black"));
    allPieces.push(new Bishop(5, 7, "black"));
    allPieces.push(new Knight(6, 7, "black"));
    allPieces.push(new Rook(7, 7, "black"));


    allPieces.forEach(el => el.getMoves());
}

initBoard(squareSize);
initPieces();

document.addEventListener("mousedown", e => e.target.piece.colorMoves());
document.addEventListener("mouseup", e => e.target.piece.clearColorMoves());