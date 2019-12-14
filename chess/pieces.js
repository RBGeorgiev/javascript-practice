class Piece {
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

        this.squares = document.getElementsByClassName("square");

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
        for (let i = 0; i < this.squares.length; i++) {
            if (
                this.pos.x === this.squares[i].pos.x
                &&
                this.pos.y === this.squares[i].pos.y
            ) {
                let pieceElem = this.pieceElem;
                pieceElem.className = `piece ${this.type} ${this.color}`;

                this.squares[i].appendChild(this.pieceElem);
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
                    this.displaySprite(square, "url(images/legal-move.png)");
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

export class King extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "king");

        this.pieceElem.piece = this;

        this.check = false;
    }


    findValidMoves() {
        let moves = [
            ...this.checkTop(1),
            ...this.checkBottom(1),
            ...this.checkRight(1),
            ...this.checkLeft(1),
            ...this.checkTopLeft(1),
            ...this.checkTopRight(1),
            ...this.checkBottomRight(1),
            ...this.checkBottomLeft(1)
        ]

        return moves;
    }

    checkCheck() {
        let x = this.pos.x,
            y = this.pos.y,
            allPieces = this.game.allPieces;

        for (const piece of allPieces) {
            if (piece.color !== this.color) {
                //avoids bug with black not getting checked sometimes
                piece.setValidMoves();
                for (const move of piece.validMoves) {
                    if (move[0] === x && move[1] === y) {
                        return this.check = true;
                    }
                }
            }
        }
        return this.check = false;
    }

    displayCheck() {
        this.displaySprite(this.pieceElem, `url(images/${this.color}-${this.type}.png), url(images/check.png)`);
    }

    castle(oldX, x) {
        let rook
        if (oldX > x) {
            //castle to the left
            rook = this.checkCastleLeft();
            rook.movePiece(this.pos.x + 1, this.pos.y);
        } else {
            //castle to the right
            rook = this.checkCastleRight();
            rook.movePiece(this.pos.x - 1, this.pos.y);
        }
        rook.placePieceOnBoard();
    }

    setCastleMoves() {
        this.legalMoves.push(...this.canCastle())
    }

    canCastle() {
        let arr = [];
        if (this.check || this.hasMoved) return arr;

        let enemyMoves = [];

        this.game.allPieces.forEach(piece => {
            if (this.color !== piece.color && piece.legalMoves.length > 0) {
                enemyMoves.push(...piece.legalMoves);
            };
        })

        let left = this.checkCastleLeft(enemyMoves),
            right = this.checkCastleRight(enemyMoves);

        if (left) {
            arr.push([this.pos.x - 2, this.pos.y]);
        }
        if (right) {
            arr.push([this.pos.x + 2, this.pos.y]);
        }
        return arr;
    }

    checkCastleLeft(enemyMoves) {
        for (let i = 1; i <= 8; i++) {
            if (this.pos.x - i < 0) return false;

            let collisionObj = this.checkCollision(this.pos.x - i, this.pos.y);

            if (collisionObj) {
                if (collisionObj.type === 'rook'
                    &&
                    collisionObj.color === this.color
                    &&
                    collisionObj.hasMoved === false
                ) {
                    return collisionObj;
                }
                return false;
            }

            if (i < 3 && !!enemyMoves) {
                //check if squares between king and rook are attacked
                for (let j = 0; j < enemyMoves.length; j++) {
                    if (
                        enemyMoves[j][0] === this.pos.x - i
                        &&
                        enemyMoves[j][1] === this.pos.y
                    ) {
                        return false;
                    }
                }
            }
        }

        return false;
    }

    checkCastleRight(enemyMoves) {
        for (let i = 1; i <= 8; i++) {
            if (this.pos.x + i < 0) return false;

            let collisionObj = this.checkCollision(this.pos.x + i, this.pos.y);

            if (collisionObj) {
                if (collisionObj.type === 'rook'
                    &&
                    collisionObj.color === this.color
                    &&
                    collisionObj.hasMoved === false
                ) {
                    return collisionObj;
                }
                return false;
            }

            //check if squares between king and rook are attacked
            for (let j = 0; j < enemyMoves.length; j++) {
                if (
                    enemyMoves[j][0] === this.pos.x + i
                    &&
                    enemyMoves[j][1] === this.pos.y
                ) {
                    return false;
                }
            }
        }

        return false;
    }
}

export class Queen extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "queen");

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

export class Rook extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "rook");

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

export class Bishop extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "bishop");

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

export class Knight extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "knight");

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

export class Pawn extends Piece {
    constructor(x, y, color, game) {
        super(x, y, color, game, "pawn");

        this.direction = (this.color === "white") ? 1 : -1;

        this.pieceElem.piece = this;

        this.enPassantTarget = false;
    }

    checkEnPassant() {
        let rightCollision = this.checkCollision(this.pos.x + 1, this.pos.y);
        let leftCollision = this.checkCollision(this.pos.x - 1, this.pos.y);

        if (leftCollision && leftCollision.type === 'pawn' && leftCollision.enPassantTarget && leftCollision.color !== this.color) {
            return [leftCollision.pos.x, leftCollision.pos.y + this.direction]
        }

        if (rightCollision && rightCollision.type === 'pawn' && rightCollision.enPassantTarget && rightCollision.color !== this.color) {
            return [rightCollision.pos.x, rightCollision.pos.y + this.direction]
        }
    }

    disableEnPassant() {
        this.enPassantTarget = false;
    }

    enableEnPassant() {
        this.enPassantTarget = true;
    }

    captureEnPassant() {
        let target = this.checkCollision(this.pos.x, this.pos.y - this.direction);
        this.capturePiece(target.pieceElem);
    }

    tryPromotion() {
        //if pawn reached end row
        if (this.pos.y === 0 || this.pos.y === 7) {
            this.promote(this.pos.x, this.pos.y, this.color, this.game);

            //remove pawn
            this.pos.x = null;
            this.pos.y = null;
            this.setTaken();
            this.pieceElem.parentNode.removeChild(this.pieceElem);
        }
    }

    promote(x, y, color, game) {
        let popUpDiv = document.getElementsByClassName("promotePopUp")[0];
        popUpDiv.id = "showPopUp";
        undoBtn.disabled = true;
        flipBtn.disabled = true;
        surrenderBtn.disabled = true;

        let getPromotion = (e) => {
            let piece = e.target.value;
            let allPieces = this.game.allPieces;

            switch (piece) {
                case "Knight":
                    allPieces.push(new Knight(x, y, color, game));
                    break;
                case "Bishop":
                    allPieces.push(new Bishop(x, y, color, game));
                    break;
                case "Rook":
                    allPieces.push(new Rook(x, y, color, game));
                    break;
                default:
                    allPieces.push(new Queen(x, y, color, game));
            }

            popUpDiv.id = "hidePopUp";
            undoBtn.disabled = false;
            flipBtn.disabled = false;
            surrenderBtn.disabled = false;

            this.game.calculateGameState();
        }

        promoteKnight.onclick = getPromotion;
        promoteBishop.onclick = getPromotion;
        promoteRook.onclick = getPromotion;
        promoteQueen.onclick = getPromotion;
    }

    findValidMoves() {
        return (this.hasMoved) ? this.getPawnMoves(1) : this.getPawnMoves(2);
    }

    getPawnMoves(steps) {
        let playerToMove = this.playerToMove;
        if (playerToMove === this.color && this.enPassantTarget) this.disableEnPassant();

        let arr = [];

        let enPassant = this.checkEnPassant();
        if (enPassant) arr.push(enPassant);

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