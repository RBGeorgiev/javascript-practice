import React from 'react';
import './App.css';

import Item from "./components/card";


function App() {
  return (
    <div className="App">
      <div className="container">
        <Item />
        <Item />
        <Item />
      </div>
    </div >
  );
}

export default App;
