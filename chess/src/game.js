import { King, Queen, Rook, Bishop, Knight, Pawn } from './allPieces.js';
import getSquareFromPoint from './getSquareFromPoint.js'

export default class Game {
    constructor(squareSize = 70) {
        this.boardSize = 8;
        this.squareSize = squareSize;
        this.playerToMove = "white";
        this.gameOver = false;
        this.allPieces = [];
        this.kings = [];

        this.currentMove = 0;
        this.previousMoves = [];

        this.capturedByWhite = document.getElementsByClassName("capturedByWhite")[0];
        this.capturedByBlack = document.getElementsByClassName("capturedByBlack")[0];

        this.squares = document.getElementsByClassName("square");

        this.moveSound;
        this.captureSound;
    }

    init() {
        this.initBoard();
        this.initPieces();
        this.saveBoardState();

        this.moveSound = new Audio("sounds/move.mp3");
        this.moveSound.volume = 0.4;
        this.captureSound = new Audio("sounds/capture.mp3");
        this.captureSound.volume = 0.3;

        undoBtn.onclick = this.undoLastMove;
        flipBtn.onclick = this.flipBoard;
        surrenderBtn.onclick = this.surrender;

        let boundSelectPiece = this.selectPiece.bind(this);
        document.addEventListener("mousedown", boundSelectPiece);
    }

    initBoard() {
        let board = document.getElementsByClassName("board")[0];
        let promotePopUp = document.getElementsByClassName("promotePopUp")[0];

        let squareSize = this.squareSize;
        let boardSize = this.boardSize;


        board.style.width = `${squareSize * boardSize}px`;
        board.style.height = `${squareSize * boardSize}px`;
        promotePopUp.style.width = `${squareSize * boardSize}px`;
        promotePopUp.style.height = `${squareSize * boardSize}px`;

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

                board.appendChild(square);
            }
        }
    }

    initPieces() {
        let whiteKing = new King(4, 0, "white", this);
        let blackKing = new King(4, 7, "black", this);
        this.kings.push(whiteKing, blackKing);

        // white
        for (let i = 0; i < this.boardSize; i++) {
            this.allPieces.push(new Pawn(i, 1, "white", this));
        }
        this.allPieces.push(
            new Rook(0, 0, "white", this),
            new Knight(1, 0, "white", this),
            new Bishop(2, 0, "white", this),
            new Queen(3, 0, "white", this),
            whiteKing,
            new Bishop(5, 0, "white", this),
            new Knight(6, 0, "white", this),
            new Rook(7, 0, "white", this)
        )

        // black
        for (let i = 0; i < this.boardSize; i++) {
            this.allPieces.push(new Pawn(i, 6, "black", this));
        }
        this.allPieces.push(
            new Rook(0, 7, "black", this),
            new Knight(1, 7, "black", this),
            new Bishop(2, 7, "black", this),
            new Queen(3, 7, "black", this),
            blackKing,
            new Bishop(5, 7, "black", this),
            new Knight(6, 7, "black", this),
            new Rook(7, 7, "black", this)
        )

        //get starting moves for all the pieces
        this.allPieces.forEach(el => el.setMoves());
    }

    saveBoardState() {
        this.currentMove++

        let prev = [...this.previousMoves];
        let pieces = this.allPieces.map(el => (
            {
                pos: { ...el.pos },
                hasMoved: el.hasMoved,
                taken: el.taken,
                validMoves: [...el.validMoves],
                legalMoves: [...el.legalMoves]
            }
        ));

        let curState = {
            "currentMove": this.currentMove,
            "previousMoves": prev,
            "playerToMove": this.playerToMove,
            "pieces": pieces,
            "gameOver": this.gameOver
        };

        this.previousMoves.push(curState);
    }

    selectPiece = (e) => {
        if (this.gameOver) return;
        const el = e.target;
        //if not clicking on a piece
        if (!el.piece) return;
        if (el.piece.color !== this.playerToMove) return;


        const squareSize = this.squareSize;
        const style = el.style;
        style.position = "absolute";
        style.height = squareSize + "px";
        style.width = squareSize + "px";
        let pieceDrag = (e) => {
            const offset = squareSize / 2;
            style.left = `${e.pageX - offset}px`;
            style.top = `${e.pageY - offset}px`;
        }

        let pieceDrop = (e) => {
            this.checkMove(e);
            //clear legal move colors 
            el.piece.clearColorMoves();
            //remove/clean up event listeners for drag and drop
            document.removeEventListener('mousemove', pieceDrag, true);
            document.removeEventListener('mouseup', pieceDrop, true);
        }

        //color all legal moves 
        el.piece.colorMoves();
        //add event listeners for drag and drop
        document.addEventListener("mousemove", pieceDrag, true);
        document.addEventListener("mouseup", pieceDrop, true);
    }

    pieceDragStop(e) {
        let el = e.target;
        el.style.position = "";
        el.style.height = "";
        el.style.width = "";
        el.style.left = "";
        el.style.top = "";
    }

    checkMove(e) {
        let x = event.clientX, y = event.clientY;
        let square = getSquareFromPoint(x, y);

        let piece = e.target.piece;
        if (!piece) return;
        let legalMoves = piece.legalMoves;

        let oldParent = piece.pieceElem.parentNode;
        let newParent;

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
                    this.saveBoardState();

                    piece.movePiece(squareX, squareY, square.firstChild);

                    this.playerToMove = (this.playerToMove === "white") ? "black" : "white";

                    break;
                }
            }
        }
        //place piece on board and stop dragging
        piece.placePieceOnBoard();
        this.pieceDragStop(e);

        newParent = piece.pieceElem.parentNode;
        if (oldParent !== newParent) {
            this.clearHightlightLastMove();
            this.highlightLastMove(oldParent, newParent);
        }

        this.calculateGameState();
    }

    calculateGameState() {
        //find all new legal moves for all pieces
        this.allPieces.forEach(el => el.setMoves());
        this.kings.forEach(king => king.setCastleMoves());

        //display game state text and king check sprite
        gameText.innerHTML = this.gameStatus();
    }

    gameStatus() {
        let gameStatus = '';
        let noMoves = this.checkNoMoves();

        if (noMoves) {
            gameStatus = 'Draw!';
            this.setGameOver();
        }

        this.kings.forEach(king => {
            //remove any previous check effects
            king.displaySprite(king.pieceElem, `url(images/${king.color}-${king.type}.png)`);
            if (king.checkCheck()) {
                if (noMoves) {
                    gameStatus = `Checkmate! ${this.getWinner()} wins!`
                    this.setGameOver();
                } else {
                    gameStatus = 'Check!';
                }
                king.displayCheck();
            }
        });

        return gameStatus;
    }

    getWinner() {
        let winner = (this.playerToMove === "white") ? "black" : "white";
        return `${winner[0].toUpperCase() + winner.slice(1)}`;
    }

    checkNoMoves() {
        let noMoves = true;
        this.allPieces.forEach(piece => {
            if (piece.color === this.playerToMove) {
                if (piece.legalMoves.length > 0) {
                    noMoves = false;
                }
            };
        })
        return noMoves;
    }

    highlightLastMove(oldParent, newParent) {
        const getElColor = el => (el.classList.contains("sqBlack")) ? "#e1ba43" : "#e8d658";

        oldParent.style.backgroundColor = getElColor(oldParent);
        if (newParent)
            newParent.style.backgroundColor = getElColor(newParent);
    }

    clearHightlightLastMove() {
        for (const square of this.squares) {
            square.style.backgroundColor = "";
        }
    }

    undoLastMove = () => {
        this.clearHightlightLastMove();

        let lastMove = this.previousMoves[this.previousMoves.length - 1];
        this.currentMove = lastMove.currentMove;
        this.previousMoves = lastMove.previousMoves;
        this.playerToMove = lastMove.playerToMove;
        this.gameOver = lastMove.gameOver;

        for (let i = 0; i < this.allPieces.length; i++) {
            let cur = this.allPieces[i],
                prev = lastMove.pieces[i];

            //if prev move has less pieces (i.e. cur move was a promotion which adds a piece), then remove the promoted piece
            if (!prev) {
                cur.pieceElem.parentNode.removeChild(cur.pieceElem);
                this.allPieces.pop();
                break;
            }

            cur.pos = prev.pos;
            cur.hasMoved = prev.hasMoved;
            cur.taken = prev.taken;
            cur.validMoves = prev.validMoves;
            cur.legalMoves = prev.legalMoves;
            cur.placePieceOnBoard();
        }

        gameText.innerHTML = this.gameStatus();

        if (this.previousMoves.length === 0) this.saveBoardState();
    }


    flipBoard() {
        let board = document.getElementsByClassName("board")[0];

        (board.classList[1] === "boardOrientWhite")
            ?
            board.classList.replace("boardOrientWhite", "boardOrientBlack")
            :
            board.classList.replace("boardOrientBlack", "boardOrientWhite")
    }

    surrender = () => {
        if (this.gameOver) return;
        let loser = this.playerToMove[0].toUpperCase() + this.playerToMove.slice(1)
        gameText.innerHTML = `${loser} surrendered. ${this.getWinner()} wins!`
        this.setGameOver();
    }

    setGameOver() {
        this.gameOver = true;
    }
}