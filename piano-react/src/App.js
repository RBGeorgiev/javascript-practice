import React from 'react';
import './App.css';


function Key(props) {
  return (
    <li className={props.className}>
      {props.note}
    </li>
  )
}

function Octave({ pitch }) {
  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return (
    <ul className="octave">
      {notes.map(n => <Key key={n + pitch} note={n} className={(n.length === 1) ? 'key' : 'key black'} />)}
    </ul>
  )
}

function Keyboard() {
  const pitchNum = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="keyboard">
      <ul className="octave">
        <Key note="A" className="key" />
        <Key note="A#" className="key black" />
        <Key note="B" className="key" />
      </ul>

      {pitchNum.map(n => <Octave key={n} pitch={n} />)}

      <ul className="octave">
        <Key note="C" className="key" />
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Piano app</h1>
      <Keyboard />
    </div>
  );
}

export default App;
