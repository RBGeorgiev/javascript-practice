import React from 'react';
import './App.css';


function Key(props) {
  return (
    <li className="key">
      {props.note}
    </li>
  )
}

function Octave() {
  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return (
    <ul>
      {notes.map(n => <Key note={n} />)}
    </ul>
  )
}

function Keyboard() {
  return (
    <div className="keyboard">
      <Key note="A" />
      <Key note="A#" />
      <Key note="B" />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Octave />
      <Key note="C" />
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
