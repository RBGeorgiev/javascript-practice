export default class Piece {
    constructor(x, y, color, game, type) {
        this.pos = {
            x,
            y
        }
        this.color = color;
        this.type = type;

        this.game = game;

        this.hasMoved = false;
        this.taken = false;

        this.pieceElem = document.createElement("div");

        this.displaySprite(this.pieceElem, `url(images/${this.color}-${this.type}.png)`);
        this.placePieceOnBoard();

        this.validMoves = [];
        this.legalMoves = [];

        this.king = (this.type !== "king") ? this.getKing() : this;
    }

    displaySprite(target, imageUrl) {
        let squareSize = this.game.squareSize;

        target.style.backgroundImage = imageUrl;
        target.style.backgroundSize = `${squareSize}px`;
        target.style.width = `${squareSize}px`;
        target.style.height = `${squareSize}px`;
    }

    getKing() {
        let kings = this.game.kings;
        for (let i = 0; i < kings.length; i++) {
            if (kings[i].color === this.color) return kings[i];
        }
    }

    setTaken = () => this.taken = true;

    movePiece(x, y, captureTarget) {
        let oldX = this.pos.x,
            oldY = this.pos.y

        this.pos.x = x;
        this.pos.y = y;

        if (captureTarget) {
            //capture the other piece
            this.capturePiece(captureTarget)
        }

        if (this.type === "pawn") {
            //check if pawn is on last row to promote
            this.tryPromotion();

            //if pawn does a starting double move
            if ((oldY + y) % 2 === 0)
                this.enableEnPassant();

            //if moving behind pawn that can be en passant'd
            if (oldX !== x && !captureTarget)
                this.captureEnPassant();
        }

        //if king does a double move / if king is castling
        if (
            this.type === "king"
            &&
            (oldX + x) % 2 === 0
            &&
            oldY === y
        ) {
            this.castle(oldX, x);
        }

        this.hasMoved = true;

        this.game.moveSound.play();
    }

    capturePiece(pieceDiv) {
        const piece = pieceDiv.piece;
        piece.pos.x = null;
        piece.pos.y = null;
        piece.setTaken();

        this.game.captureSound.play();

        //remove captured piece from board and place in correct capture area
        (piece.color === "white")
            ?
            this.game.capturedByBlack.appendChild(pieceDiv)
            :
            this.game.capturedByWhite.appendChild(pieceDiv);
    }


    //#region - direction and collision check functions
    checkCollision(x, y) {
        let allPieces = this.game.allPieces;

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

    checkTop(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkBottom(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkRight(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkLeft(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkTopLeft(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkTopRight(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkBottomRight(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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

    checkBottomLeft(steps) {
        let boardSize = this.game.boardSize;
        if (!steps) steps = boardSize - 1;
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
        let squares = this.game.squares;

        for (let i = 0; i < squares.length; i++) {
            if (
                this.pos.x === squares[i].pos.x
                &&
                this.pos.y === squares[i].pos.y
            ) {
                let pieceElem = this.pieceElem;
                pieceElem.className = `piece ${this.type} ${this.color}`;

                squares[i].appendChild(this.pieceElem);
            }
        }
    }

    //#region - visual display functions
    colorMoves() {
        for (const square of this.game.squares) {
            for (const coord of this.legalMoves) {
                if (
                    square.pos.x === coord[0]
                    &&
                    square.pos.y === coord[1]
                ) {
                    this.displaySprite(square, "url(images/legal-move.png)");
                }
            }
        }
    }

    clearColorMoves() {
        for (const square of this.game.squares) {
            square.style.backgroundImage = "";
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
        let squares = this.game.squares;
        for (let i = 0; i < squares.length; i++) {
            if (
                squares[i].pos.x === x
                &&
                squares[i].pos.y === y
            ) {
                return squares[i];
            }
        }
    }

    testMove(x, y, square) {
        //old xy values for moved piece
        let oldX = this.pos.x,
            oldY = this.pos.y;
        //old xy values for captured piece
        let takenPiece,
            takenLastPosX,
            takenLastPosY;
        //save old valid moves
        let oldValidMoves = this.validMoves,
            allPieces = this.game.allPieces;


        //if landed on another piece
        if (square.firstChild) {
            //if taking a piece 
            takenPiece = square.firstChild.piece;
            takenLastPosX = takenPiece.pos.x;
            takenLastPosY = takenPiece.pos.y;
            //temporarily capture the other piece
            takenPiece.pos.x = null;
            takenPiece.pos.y = null;
        } else if (this.type === "pawn" && oldX !== x && !takenPiece) {
            //if en passant
            takenPiece = this.checkCollision(x, y - this.direction);
            takenLastPosX = takenPiece.pos.x;
            takenLastPosY = takenPiece.pos.y;
            takenPiece.pos.x = null;
            takenPiece.pos.y = null;
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

        if (takenPiece) {
            //bring back temporarily captured piece
            takenPiece.pos.x = takenLastPosX;
            takenPiece.pos.y = takenLastPosY;
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