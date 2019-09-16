import React, { useState } from 'react';
import './App.css';
import VolumeSlider from './components/volume-slider';
import Checkbox from './components/checkbox';
import Keyboard from './components/keyboard';
import changeVol from './components/tone/change-volume';


function App() {
  const [sustain, setSustain] = useState(true);

  const changeVolume = (e) => {
    changeVol(e.target.value);
  }

  return (
    <div className="App">
      <h1>Piano app</h1>
      <div className="controls">
        <VolumeSlider onChange={changeVolume} />
        <Checkbox label='Enable fixed note duration' sustain={sustain} onChange={() => setSustain(!sustain)} />
      </div>
      <Keyboard sustain={sustain} />
    </div>
  );
}

export default App;