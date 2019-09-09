import React from 'react';
import './App.css';
import Tone from 'tone';


const synth = new Tone.Synth().toMaster();
function playNote(note) {
  synth.triggerAttackRelease(note, '4n');
}


function Key(props) {
  return (
    <li className={props.className} onClick={() => playNote(props.note)}>
      {props.note}
    </li>
  )
}

function Octave({ pitch }) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const createOctave = (pitch) => {
    if (pitch === 0) return notes.slice(-3).map(n => <Key key={n + pitch} note={n + pitch} className={(n.length === 1) ? 'key' : 'key black'} />);

    if (pitch === 8) return notes.slice(0, 1).map(n => <Key key={n + pitch} note={n + pitch} className={(n.length === 1) ? 'key' : 'key black'} />);

    return notes.map(n => <Key key={n + pitch} note={n + pitch} className={(n.length === 1) ? 'key' : 'key black'} />);
  }

  return (
    <ul className="octave">
      {createOctave(pitch)}
    </ul>
  )
}

function Keyboard() {
  const pitchNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="keyboard">
      {pitchNum.map(n => <Octave key={n} pitch={n} />)}
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
