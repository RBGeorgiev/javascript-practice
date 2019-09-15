import React from 'react';
import './App.css';
import VolumeSlider from './components/volume-slider';
import NoteSustainCheckbox from './components/note-sustain';
import Keyboard from './components/keyboard';
import changeVol from './components/tone/change-volume';


function App() {
  const changeVolume = (e) => {
    changeVol(e.target.value);
  }

  return (
    <div className="App">
      <h1>Piano app</h1>
      <div className="controls">
        <VolumeSlider onChange={changeVolume} />
        <NoteSustainCheckbox />
      </div>
      <Keyboard />
    </div>
  );
}

export default App;