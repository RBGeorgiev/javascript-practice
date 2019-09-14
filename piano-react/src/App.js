import React from 'react';
import './App.css';
import VolumeSlider from './components/volume-slider'
import NoteSustainCheckbox from './components/note-sustain'
import Keyboard from './components/keyboard'

function App() {
  return (
    <div className="App">
      <h1>Piano app</h1>
      <div className="controls">
        <VolumeSlider />
        <NoteSustainCheckbox />
      </div>
      <Keyboard />
    </div>
  );
}

export default App;