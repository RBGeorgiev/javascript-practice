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
        this.validMoves;
    }

    checkTop(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkBottom(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkRight(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkLeft(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkTopLeft(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkTopRight(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkBottomRight(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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

    checkBottomLeft(len) {
        let arr = [];
        let loopLength = len || boardSize;
        for (let i = 1; i < loopLength; i++) {
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
        for (const square of this.squares) {
            square.style.background = "";
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
}

class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "king");

        this.hasMoved = false;

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = {
            top: this.checkTop(2),
            bottom: this.checkBottom(2),
            right: this.checkRight(2),
            left: this.checkLeft(2),
            topLeft: this.checkTopLeft(2),
            topRight: this.checkTopRight(2),
            bottomRight: this.checkBottomRight(2),
            bottomLeft: this.checkBottomLeft(2)
        }

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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

    getValidMoves() {
        this.validMoves = {
            top: this.checkTop(),
            bottom: this.checkBottom(),
            right: this.checkRight(),
            left: this.checkLeft()
        }

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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

    getValidMoves() {
        this.validMoves = {
            topLeft: this.checkTopLeft(),
            topRight: this.checkTopRight(),
            bottomRight: this.checkBottomRight(),
            bottomLeft: this.checkBottomLeft()
        }

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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


    getValidMoves() {
        let movesArr = [];

        for (let i = 0; i < this.moves.length; i++) {
            if (
                this.moves[i].x <= 7 &&
                this.moves[i].x >= 0 &&
                this.moves[i].y <= 7 &&
                this.moves[i].y >= 0
            ) {
                let collisionObj = this.checkCollision(this.moves[i].x, this.moves[i].y);

                if (collisionObj) {
                    movesArr.push(collisionObj);
                } else {
                    movesArr.push([this.moves[i].x, this.moves[i].y])
                }
            }
        }

        this.validMoves = {
            knight: movesArr
        }

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        if (this.color === "white") {
            this.validMoves = {
                top: (this.hasMoved) ? this.checkBottom(2) : this.checkTop(3)
            }
        } else {
            this.validMoves = {
                bottom: (this.hasMoved) ? this.checkBottom(2) : this.checkBottom(3)
            }
        }

        console.log(this.color, this.type, `x:${this.pos.x}, y:${this.pos.y}`, this.validMoves);
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


    allPieces.forEach(el => { el.getMoves(); el.getValidMoves() });
}

initBoard(squareSize);
initPieces();

document.addEventListener("mousedown", e => e.target.piece.colorMoves());
document.addEventListener("mouseup", e => e.target.piece.clearColorMoves());