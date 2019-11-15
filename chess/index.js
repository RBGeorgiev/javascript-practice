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

        this.placePieceOnBoard();

        this.validMoves;
    }

    setIsTaken = () => this.setIsTaken = true;

    //#region - direction and collision check functions
    checkCollision(x, y) {
        for (let j = 0; j < this.allPieces.length; j++) {
            if (
                x === this.allPieces[j].pos.x
                &&
                y === this.allPieces[j].pos.y
            ) {
                return this.allPieces[j];
            }
        }
    }

    checkTop(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (this.pos.y + i > boardSize - 1) return arr;

            let collisionObj = this.checkCollision(this.pos.x, this.pos.y + i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x, this.pos.y + i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x, this.pos.y + i]);
            }
        }
        return arr;
    }

    checkBottom(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (this.pos.y - i < 0) return arr;

            let collisionObj = this.checkCollision(this.pos.x, this.pos.y - i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x, this.pos.y - i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x, this.pos.y - i]);
            }
        }
        return arr;
    }

    checkRight(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (this.pos.x + i > boardSize - 1) return arr;

            let collisionObj = this.checkCollision(this.pos.x + i, this.pos.y);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x + i, this.pos.y]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x + i, this.pos.y]);
            }
        }
        return arr;
    }

    checkLeft(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (this.pos.x - i < 0) return arr;

            let collisionObj = this.checkCollision(this.pos.x - i, this.pos.y);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x - i, this.pos.y]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x - i, this.pos.y]);
            }
        }
        return arr;
    }

    checkTopLeft(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (
                this.pos.y + i > boardSize - 1
                ||
                this.pos.x - i < 0
            ) return arr;

            let collisionObj = this.checkCollision(this.pos.x - i, this.pos.y + i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x - i, this.pos.y + i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x - i, this.pos.y + i]);
            }
        }
        return arr;
    }

    checkTopRight(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (
                this.pos.y + i > boardSize - 1
                ||
                this.pos.x + i > boardSize - 1
            ) return arr;

            let collisionObj = this.checkCollision(this.pos.x + i, this.pos.y + i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x + i, this.pos.y + i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x + i, this.pos.y + i]);
            }
        }
        return arr;
    }

    checkBottomRight(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (
                this.pos.y - i < 0
                ||
                this.pos.x + i > boardSize - 1
            ) return arr;

            let collisionObj = this.checkCollision(this.pos.x + i, this.pos.y - i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x + i, this.pos.y - i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x + i, this.pos.y - i]);
            }
        }
        return arr;
    }

    checkBottomLeft(steps = boardSize - 1) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            if (
                this.pos.y - i < 0
                ||
                this.pos.x - i < 0
            ) return arr;

            let collisionObj = this.checkCollision(this.pos.x - i, this.pos.y - i);

            if (collisionObj) {
                if (collisionObj.color === this.color) {
                    return arr;
                } else {
                    arr.push([this.pos.x - i, this.pos.y - i]);
                    return arr;
                }
            } else {
                arr.push([this.pos.x - i, this.pos.y - i]);
            }
        }
        return arr;
    }
    //#endregion - direction and collision check functions

    //#region - visual display functions
    placePieceOnBoard = () => {
        for (let i = 0; i < this.squares.length; i++) {
            if (
                this.pos.x === this.squares[i].pos.x
                &&
                this.pos.y === this.squares[i].pos.y
            ) {
                let pieceElem = this.pieceElem;
                pieceElem.className = `piece ${this.type} ${this.color}`;

                pieceElem.innerHTML = `${this.color} ${this.type}`;

                this.squares[i].appendChild(pieceElem);
            }
        }
    }

    colorMoves() {
        let allCoord = [];

        Object.entries(this.validMoves).forEach(([key, val]) => allCoord.push(...val));

        for (const square of this.squares) {
            for (const coord of allCoord) {
                if (
                    square.pos.x === coord[0]
                    &&
                    square.pos.y === coord[1]
                ) {
                    square.style.background = "green";
                }
            }
        }
    }

    clearColorMoves() {
        for (const square of this.squares) {
            square.style.background = "";
        }
    }
    //#endregion - visual display functions
}

class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "king");

        this.hasMoved = false;

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = {
            top: this.checkTop(1),
            bottom: this.checkBottom(1),
            right: this.checkRight(1),
            left: this.checkLeft(1),
            topLeft: this.checkTopLeft(1),
            topRight: this.checkTopRight(1),
            bottomRight: this.checkBottomRight(1),
            bottomLeft: this.checkBottomLeft(1)
        }
    }
}

class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "queen");

        this.pieceElem.piece = this;

    }

    getValidMoves() {
        this.validMoves = {
            top: this.checkTop(),
            bottom: this.checkBottom(),
            right: this.checkRight(),
            left: this.checkLeft(),
            topLeft: this.checkTopLeft(),
            topRight: this.checkTopRight(),
            bottomRight: this.checkBottomRight(),
            bottomLeft: this.checkBottomLeft()
        }
    }
}

class Rook extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "rook");

        this.hasMoved = false;

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = {
            top: this.checkTop(),
            bottom: this.checkBottom(),
            right: this.checkRight(),
            left: this.checkLeft()
        }
    }
}

class Bishop extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "bishop");

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = {
            topLeft: this.checkTopLeft(),
            topRight: this.checkTopRight(),
            bottomRight: this.checkBottomRight(),
            bottomLeft: this.checkBottomLeft()
        }
    }
}

class Knight extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "knight");

        this.pieceElem.piece = this;

        this.knightMoves = this.getKnightMoves();
    }


    getValidMoves() {
        let movesArr = [];

        for (let i = 0; i < this.knightMoves.length; i++) {
            if (
                this.knightMoves[i].x <= 7 &&
                this.knightMoves[i].x >= 0 &&
                this.knightMoves[i].y <= 7 &&
                this.knightMoves[i].y >= 0
            ) {
                let collisionObj = this.checkCollision(this.knightMoves[i].x, this.knightMoves[i].y);

                if (collisionObj) {
                    movesArr.push(collisionObj);
                } else {
                    movesArr.push([this.knightMoves[i].x, this.knightMoves[i].y])
                }
            }
        }

        this.validMoves = {
            knight: movesArr
        }
    }

    getKnightMoves() {
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

    getValidMoves() {
        this.validMoves = {
            pawn: (this.hasMoved) ? this.getPawnMove(1) : this.getPawnMove(2)
        }
    }

    getPawnMove(steps) {
        let arr = [];

        for (let i = 1; i <= steps; i++) {
            let collisionObj = this.checkCollision(this.pos.x, this.pos.y + (i * this.direction));

            (collisionObj)
                ? arr
                : arr.push([this.pos.x, this.pos.y + (i * this.direction)]);
        }

        return arr;
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


    allPieces.forEach(el => el.getValidMoves());
}

initBoard(squareSize);
initPieces();

document.addEventListener("mousedown", e => e.target.piece.colorMoves());
document.addEventListener("mouseup", e => e.target.piece.clearColorMoves());