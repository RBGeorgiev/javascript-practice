import React from 'react';
import './App.css';


function Key(props) {
  return (
    <li className={props.className}>
      {props.note}
    </li>
  )
}

function Octave() {
  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return (
    <ul className="octave">
      {notes.map(n => <Key note={n} className={(n.length === 1) ? 'key' : 'key black'} />)}
    </ul>
  )
}

function Keyboard() {
  return (
    <div className="keyboard">
      <ul className="octave">
        <Key note="A" className="key" />
        <Key note="A#" className="key black" />
        <Key note="B" className="key" />
      </ul>

      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />

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
