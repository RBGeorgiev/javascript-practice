let boardSize = 8;
let squareSize = 70;
let playerToMove = "white";
let allPieces = [];
let kings = [];

let currentMove = 0;
let previousMoves = [];

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

        this.validMoves = [];
        this.legalMoves = [];

        this.king = (this.type !== "king") ? this.getKing() : this;
    }

    getKing() {
        for (let i = 0; i < kings.length; i++) {
            if (kings[i].color === this.color) return kings[i];
        }
    }

    setTaken = () => this.taken = true;

    //#region - direction and collision check functions
    checkCollision(x, y) {
        for (let j = 0; j < allPieces.length; j++) {
            if (
                x === allPieces[j].pos.x
                &&
                y === allPieces[j].pos.y
            ) {
                return allPieces[j];
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
            for (const coord of this.legalMoves) {
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

    setMoves() {
        this.setValidMoves();
        this.setLegalMoves();
    }

    setValidMoves() {
        this.validMoves = this.findValidMoves();
    }

    setLegalMoves() {
        this.legalMoves = this.findLegalMoves();
    }

    findLegalMoves() {
        let arr = [];
        if (this.validMoves.length === 0 || this.taken)
            return arr;

        for (let i = this.validMoves.length - 1; i >= 0; i--) {
            let x = this.validMoves[i][0];
            let y = this.validMoves[i][1];
            let square = this.findSquare(x, y);
            let legalMove = this.testMove(x, y, square);

            if (legalMove) {
                arr.push(this.validMoves[i]);
            }
        }
        return arr;
    }

    findSquare(x, y) {
        for (let i = 0; i < this.squares.length; i++) {
            if (
                this.squares[i].pos.x === x
                &&
                this.squares[i].pos.y === y
            ) {
                return this.squares[i];
            }
        }
    }

    testMove(x, y, square) {
        //old xy values for moved piece
        let oldX = this.pos.x,
            oldY = this.pos.y;
        //old xy values for captured piece
        let takenLastPosX,
            takenLastPosY;
        //save old valid moves
        let oldValidMoves = this.validMoves;


        //if landed on another piece
        if (square.firstChild) {
            takenLastPosX = square.firstChild.piece.pos.x;
            takenLastPosY = square.firstChild.piece.pos.y;
            //temporarily capture the other piece
            square.firstChild.piece.pos.x = null;
            square.firstChild.piece.pos.y = null;
        }

        //point piece to new square
        this.pos.x = x;
        this.pos.y = y;

        //find all valid moves for test move
        allPieces.forEach(el => el.setValidMoves());
        //see if king would be in check in the test move was made (i.e. is move legal)
        let legalMove = this.isLegalMove();
        //restore valid moves to before test
        this.validMoves = oldValidMoves;

        //restore xy values
        this.pos.x = oldX;
        this.pos.y = oldY;

        if (square.firstChild) {
            //bring back temporarily captured piece
            square.firstChild.piece.pos.x = takenLastPosX;
            square.firstChild.piece.pos.y = takenLastPosY;
        }

        return legalMove;
    }

    isLegalMove() {
        let legalMove = true;

        if (this.king.checkCheck())
            legalMove = false;

        return legalMove;
    }
}

class King extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "king");

        this.pieceElem.piece = this;

        this.check = false;
    }


    findValidMoves() {
        return [
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
                    if (move[0] === x && move[1] === y) {
                        this.pieceElem.id = "checked";
                        return this.check = true;
                    }
                }
            }
        }
        this.pieceElem.id = "";
        return this.check = false;
    }
}

class Queen extends Piece {
    constructor(x, y, color) {
        super(x, y, color, "queen");

        this.pieceElem.piece = this;

    }


    findValidMoves() {
        return [
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


    findValidMoves() {
        return [
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


    findValidMoves() {
        return [
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


    findValidMoves() {
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

        return arr;
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


    findValidMoves() {
        return (this.hasMoved) ? this.getPawnMoves(1) : this.getPawnMoves(2);
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

    //get starting moves for all the pieces
    allPieces.forEach(el => el.setMoves());
}


document.addEventListener("mousedown", e => {
    const el = e.target;
    //if not clicking on a piece
    if (!el.piece) return;
    if (el.piece.color !== playerToMove) return;

    const style = el.style;
    style.position = "absolute";
    style.height = squareSize + "px";
    style.width = squareSize + "px";
    function pieceDrag(e) {
        const offset = squareSize / 2;
        style.left = `${e.pageX - offset}px`;
        style.top = `${e.pageY - offset}px`;
    }

    //color all legal moves 
    el.piece.colorMoves();
    //add event listeners for drag and drop
    document.addEventListener("mousemove", pieceDrag, true);
    document.addEventListener("mouseup", pieceDrop, true);

    function pieceDrop(e) {
        checkMove(e);
        //clear legal move colors 
        el.piece.clearColorMoves();
        //remove/clean up event listeners for drag and drop
        document.removeEventListener('mousemove', pieceDrag, true);
        document.removeEventListener('mouseup', pieceDrop, true);
    }
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

function checkMove(e) {
    let x = event.clientX, y = event.clientY;
    let square = getSquareFromPoint(x, y);

    let piece = e.target.piece;
    if (!piece) return;
    let legalMoves = piece.legalMoves;

    //if dropped on a square
    if (square) {
        let squareX = square.pos.x;
        let squareY = square.pos.y;

        //check if valid move
        for (let i = 0; i < legalMoves.length; i++) {
            if (
                squareX === legalMoves[i][0]
                &&
                squareY === legalMoves[i][1]
            ) {
                currentMove++
                saveBoardState();

                piece.pos.x = squareX;
                piece.pos.y = squareY;

                if (square.firstChild) {
                    //capture the other piece
                    capturePiece(square.firstChild)
                }

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
    allPieces.forEach(el => el.setMoves());

    winText.innerHTML = gameStatus();
}

function capturePiece(pieceDiv) {
    const piece = pieceDiv.piece;
    piece.pos.x = null;
    piece.pos.y = null;
    piece.setTaken();

    //remove captured piece from board and place in correct capture area
    (piece.color === "white")
        ?
        capturedByBlack.appendChild(pieceDiv)
        :
        capturedByWhite.appendChild(pieceDiv);
}

function gameStatus() {
    let gameStatus = '';
    let noMoves = canMove();

    if (noMoves) gameStatus = 'Draw!';

    kings.forEach(king => {
        if (king.checkCheck()) {
            (noMoves)
                ?
                gameStatus = `Checkmate! ${getWinner()} wins!`
                :
                gameStatus = 'Check!';
        }
    });

    return gameStatus;
}

function getWinner() {
    let winner = (playerToMove === "white") ? "black" : "white";
    return `${winner[0].toUpperCase() + winner.slice(1)}`;
}

function canMove() {
    let canMove = true;
    allPieces.forEach(piece => {
        if (piece.color === playerToMove) {
            if (piece.legalMoves.length > 0) {
                canMove = false;
            }
        };
    })
    return canMove;
}

function undoLastMove() {
    let lastMove = previousMoves[previousMoves.length - 1];
    currentMove = lastMove.currentMove;
    previousMoves = lastMove.previousMoves;
    playerToMove = lastMove.playerToMove;

    for (let i = 0; i < allPieces.length; i++) {
        let cur = allPieces[i],
            prev = lastMove.pieces[i];
        cur.pos = prev.pos;
        cur.hasMoved = prev.hasMoved;
        cur.taken = prev.taken;
        cur.validMoves = prev.validMoves;
        cur.legalMoves = prev.legalMoves;
        cur.placePieceOnBoard();
    }

    winText.innerHTML = gameStatus();

    if (previousMoves.length === 0) saveBoardState();
}

function saveBoardState() {
    let prev = [...previousMoves]
    let pieces = allPieces.map(el => (
        {
            pos: { ...el.pos },
            hasMoved: el.hasMoved,
            taken: el.taken,
            validMoves: [...el.validMoves],
            legalMoves: [...el.legalMoves]
        }
    ))

    let curState = {
        "currentMove": currentMove,
        "previousMoves": prev,
        "playerToMove": playerToMove,
        "pieces": pieces
    }

    previousMoves.push(curState)
}

function init() {
    initBoard(squareSize);
    initPieces();
    saveBoardState();
    undo.onclick = undoLastMove;
}

document.onload = init();