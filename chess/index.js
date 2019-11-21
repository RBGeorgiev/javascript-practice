let boardSize = 8;
let squareSize = 70;
let playerToMove = "white";
let allPieces = [];
let kings = [];

let capturedByWhite = document.getElementsByClassName("capturedByWhite")[0];
let capturedByBlack = document.getElementsByClassName("capturedByBlack")[0];

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

        this.hasMoved = false;
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

    //#region - visual display functions
    colorMoves() {
        for (const square of this.squares) {
            for (const coord of this.validMoves) {
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

        this.pieceElem.piece = this;

        this.check = false;
    }

    getValidMoves() {
        this.validMoves = [
            ...this.checkTop(1),
            ...this.checkBottom(1),
            ...this.checkRight(1),
            ...this.checkLeft(1),
            ...this.checkTopLeft(1),
            ...this.checkTopRight(1),
            ...this.checkBottomRight(1),
            ...this.checkBottomLeft(1)
        ]
    }

    checkCheck() {
        let x = this.pos.x,
            y = this.pos.y
        for (const piece of allPieces) {
            if (piece.color !== this.color) {
                for (const move of piece.validMoves) {
                    if (move[0] === x && move[1] === y) return true;
                }
            }
        }
        return false;
    }
}

class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "queen");

        this.pieceElem.piece = this;

    }

    getValidMoves() {
        this.validMoves = [
            ...this.checkTop(),
            ...this.checkBottom(),
            ...this.checkRight(),
            ...this.checkLeft(),
            ...this.checkTopLeft(),
            ...this.checkTopRight(),
            ...this.checkBottomRight(),
            ...this.checkBottomLeft()
        ]
    }
}

class Rook extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "rook");

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = [
            ...this.checkTop(),
            ...this.checkBottom(),
            ...this.checkRight(),
            ...this.checkLeft()
        ]
    }
}

class Bishop extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "bishop");

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = [
            ...this.checkTopLeft(),
            ...this.checkTopRight(),
            ...this.checkBottomRight(),
            ...this.checkBottomLeft()
        ]
    }
}

class Knight extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "knight");

        this.pieceElem.piece = this;

        this.knightMoves = this.getKnightMoves();
    }


    getValidMoves() {
        let arr = [];
        let x = this.pos.x;
        let y = this.pos.y;

        for (let i = 0; i < this.knightMoves.length; i++) {
            let moveX = x + this.knightMoves[i].x,
                moveY = y + this.knightMoves[i].y;

            if (
                moveX <= 7 &&
                moveX >= 0 &&
                moveY <= 7 &&
                moveY >= 0
            ) {
                let collisionObj = this.checkCollision(moveX, moveY);

                if (collisionObj) {
                    if (collisionObj.color !== this.color) {
                        arr.push([moveX, moveY]);
                    }
                } else {
                    arr.push([moveX, moveY])
                }
            }
        }

        this.validMoves = arr;
    }

    getKnightMoves() {
        let moves = [
            {
                x: +2,
                y: -1
            },
            {
                x: +2,
                y: +1
            },
            {
                x: -2,
                y: -1
            },
            {
                x: -2,
                y: +1
            },
            {
                x: +1,
                y: +2
            },
            {
                x: -1,
                y: +2
            },
            {
                x: +1,
                y: -2
            },
            {
                x: -1,
                y: -2
            }
        ]

        return moves;
    }
}

class Pawn extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "pawn");

        this.direction = (this.color === "white") ? 1 : -1;

        this.pieceElem.piece = this;
    }

    getValidMoves() {
        this.validMoves = (this.hasMoved) ? this.getPawnMoves(1) : this.getPawnMoves(2);
    }

    getPawnMoves(steps) {
        let arr = [];

        //check for an attack on the left side
        let leftCollision = this.checkCollision(this.pos.x - 1, this.pos.y + this.direction);
        if (leftCollision && leftCollision.color !== this.color)
            arr.push([this.pos.x - 1, this.pos.y + this.direction]);

        //check for an attack on the right side
        let rightCollision = this.checkCollision(this.pos.x + 1, this.pos.y + this.direction);
        if (rightCollision && rightCollision.color !== this.color)
            arr.push([this.pos.x + 1, this.pos.y + this.direction]);


        for (let i = 1; i <= steps; i++) {
            let collisionObj = this.checkCollision(this.pos.x, this.pos.y + (i * this.direction));

            if (collisionObj) {
                return arr;
            } else {
                arr.push([this.pos.x, this.pos.y + (i * this.direction)]);
            }
        }

        return arr;
    }
}


function initPieces() {
    let whiteKing = new King(4, 0, "white");
    let blackKing = new King(4, 7, "black");
    kings.push(whiteKing, blackKing)

    // white
    for (let i = 0; i < boardSize; i++) {
        allPieces.push(new Pawn(i, 1, "white"));
    }
    allPieces.push(
        new Rook(0, 0, "white"),
        new Knight(1, 0, "white"),
        new Bishop(2, 0, "white"),
        new Queen(3, 0, "white"),
        whiteKing,
        new Bishop(5, 0, "white"),
        new Knight(6, 0, "white"),
        new Rook(7, 0, "white")
    )

    // black
    for (let i = 0; i < boardSize; i++) {
        allPieces.push(new Pawn(i, 6, "black"));
    }
    allPieces.push(
        new Rook(0, 7, "black"),
        new Knight(1, 7, "black"),
        new Bishop(2, 7, "black"),
        new Queen(3, 7, "black"),
        blackKing,
        new Bishop(5, 7, "black"),
        new Knight(6, 7, "black"),
        new Rook(7, 7, "black")
    )

    allPieces.forEach(el => el.getValidMoves());
}

initBoard(squareSize);
initPieces();

document.addEventListener("mousedown", e => {
    let piece = e.target.piece;
    //if not clicking on a piece
    if (!piece) return;
    if (piece.color !== playerToMove) return;

    //color all valid moves 
    piece.colorMoves();
    //add event listeners for drag and drop
    document.addEventListener("mousemove", pieceDrag, true);
    document.addEventListener("mouseup", pieceDrop, true);
});

function getSquareFromPoint(x, y) {
    let element, elements = [];
    let old_visibility = [];
    while (true) {
        element = document.elementFromPoint(x, y);

        if (element.matches(".square")) {
            break;
        }

        if (!element || element === document.documentElement) {
            element = null;
            break;
        }
        elements.push(element);
        old_visibility.push(element.style.visibility);
        element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    for (let k = 0; k < elements.length; k++) {
        elements[k].style.visibility = old_visibility[k];
    }

    return element;
}

function pieceDragStop(e) {
    let el = e.target;
    el.style.position = "";
    el.style.height = "";
    el.style.width = "";
    el.style.left = "";
    el.style.top = "";
}

function pieceDrag(e) {
    let el = e.target;
    //fixes bug when moving mouse too fast while dragging
    if (!el.piece || el.piece.color !== playerToMove) return;

    el.style.position = "absolute";
    el.style.height = squareSize + "px";
    el.style.width = squareSize + "px";
    el.style.left = (e.pageX - squareSize / 2) + "px";
    el.style.top = (e.pageY - squareSize / 2) + "px";
}

function pieceDrop(e) {
    let x = event.clientX, y = event.clientY;
    let square = getSquareFromPoint(x, y);

    let piece = e.target.piece;
    if (!piece) return;
    let validMoves = piece.validMoves;

    //if dropped on a square
    if (square) {
        let squareX = square.pos.x;
        let squareY = square.pos.y;

        //check if valid move
        for (let i = 0; i < validMoves.length; i++) {
            if (
                squareX === validMoves[i][0]
                &&
                squareY === validMoves[i][1]
            ) {
                // if landed on another piece
                if (square.firstChild) {
                    //capture the other piece
                    square.firstChild.piece.pos.x = null;
                    square.firstChild.piece.pos.y = null;
                    (piece.color === "white")
                        ?
                        capturedByWhite.appendChild(square.firstChild)
                        :
                        capturedByBlack.appendChild(square.firstChild);
                }
                //point piece to new square
                piece.pos.x = squareX;
                piece.pos.y = squareY;
                piece.hasMoved = true;

                playerToMove = (playerToMove === "white") ? "black" : "white";
                break;
            }
        }
    }
    //place piece on board and stop dragging
    piece.placePieceOnBoard();
    pieceDragStop(e);

    //find all new valid moves for all pieces
    allPieces.forEach(el => el.getValidMoves());
    kings.forEach(king => king.check = king.checkCheck())

    //clear valid move colors  
    piece.clearColorMoves();
    //remove/clean up event listeners for drag and drop
    document.removeEventListener('mousemove', pieceDrag, true);
    document.removeEventListener('mouseup', pieceDrop, true);
}