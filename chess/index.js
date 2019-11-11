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

initBoard(70);

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
                piece.className = `${this.type} ${this.color}`;
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

let wKing = new King(4, 0, "white");
let bKing = new King(4, 7, "black");