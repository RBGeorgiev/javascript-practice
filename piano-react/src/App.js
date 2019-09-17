import React, { useState } from 'react';
import './App.css';
import VolumeSlider from './components/volume-slider';
import Checkbox from './components/checkbox';
import Keyboard from './components/keyboard';
import changeVol from './components/tone/change-volume';
import muteVol from './components/tone/mute-volume';


function App() {
  const [sustain, setSustain] = useState(true);
  const [mute, setMute] = useState(false);

  const changeVolume = (e) => {
    changeVol(e.target.value);
  }

  const muteVolume = () => {
    setMute(!mute);
    muteVol(!mute); //setMute is asynch, so muteVol() gets called before state changes
  }

  return (
    <div className="App">
      <h1>Piano app</h1>
      <div className="controls">
        <VolumeSlider onChange={changeVolume} />
        <Checkbox label='Mute' defaultChecked={mute} onChange={muteVolume} />
        <Checkbox label='Enable fixed note duration' defaultChecked={sustain} onChange={() => setSustain(!sustain)} />
      </div>
      <Keyboard sustain={sustain} />
    </div>
  );
}

export default App;