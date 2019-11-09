import React, { useState } from 'react';
import './App.css';

function Piece(props) {
  const [pos, setPos] = useState(props.pos);
  const [taken, setTaken] = useState(props.taken);
  const [isWhite, setIsWhite] = useState(props.isWhite);
  const [type, setType] = useState(props.type);

  return (
    <div>
      {props.type}
    </div>
  )
}

function Square(props) {
  const [piece, setPiece] = useState(null)

  return (
    <div className={props.sqColor} onClick={() => setPiece(<Piece pos={{ x: props.x, y: props.y }} taken={false} isWhite={false} tpye={"P"} />)}>
      {/* {props.x}, {props.y} */}
      {piece}
    </div>
  )
}

function Board() {

  const initBoard = () => {
    const board = [];

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        board.push(
          <Square
            key={y * 8 + x}
            x={x}
            y={y}
            sqColor={((y + x) % 2) ? "square white" : "square black"}
          />
        )
      }
    }

    return board;
  }

  return (
    <div className="board">
      {initBoard()}
    </div>
  )
}

function App() {
  return (
    <div className="container">
      <Board />
    </div>
  );
}

export default App;