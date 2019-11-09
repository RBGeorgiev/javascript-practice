import React from 'react';
import './App.css';

function Square(props) {
  return (
    <div className={props.isWhite}>
      {props.x}, {props.y}
    </div>
  )
}


function Board() {

  const fillBoard = () => {
    const board = [];

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        board.push(
          <Square
            key={y * 8 + x}
            x={x}
            y={y}
            isWhite={((y + x) % 2) ? "square white" : "square black"}
          />
        )
      }
    }

    return board;
  }

  return (
    <div className="board">
      {fillBoard()}
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