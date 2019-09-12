import React from 'react';
import './App.css';
import Tone from 'tone';


const synth = new Tone.Synth().toMaster();

function changeVol(vol) {
  synth.volume.value = vol;
}

function playNote(note) {
  synth.triggerAttack(note);
}

function releaseNote() {
  synth.triggerRelease();
}


function VolumeSlider() {
  let handleChange = (e) => {
    changeVol(e.target.value);
  }

  return (
    <div className='volumeController'>
      <label>Volume</label>
      <input
        className='volumeSlider'
        type="range"
        min="-35" max="15"
        defaultValue='0'
        onChange={handleChange}
        step="1"
      />
    </div>

  );
}

function Key(props) {
  return (
    <li
      className={props.className}
      onMouseDown={() => playNote(props.note)}
      onMouseUp={() => releaseNote()}
    />
  )
}

function Octave({ pitch }) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const createKey = (n) =>
    <Key
      key={n + pitch}
      note={n + pitch}
      className={(n.length === 1) ? 'key' : 'key black'}
    />

  const createOctave = (pitch) => {
    // pitch 0 has only 3 notes: 'A0', 'A#0', 'B0'
    if (pitch === 0) return notes.slice(-3).map(n => createKey(n));
    // pitch 8 has only 1 note: 'C8'
    if (pitch === 8) return notes.slice(0, 1).map(n => createKey(n));
    // all other pitches include all notes
    return notes.map(n => createKey(n));
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
      <VolumeSlider />
      <Keyboard />
    </div>
  );
}

export default App;
