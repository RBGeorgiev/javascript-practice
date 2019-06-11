import React from 'react';
import './App.css';
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <header>
        <p>Welcome to</p>
        <h1>Camp Woodhill</h1>
      </header>

      <Main />

      <footer>
        <p>V2 Tattenhoe St, Milton Keynes MK4 4DA</p>
        <h3>Camp Woodhill</h3>
      </footer>
    </div>
  );
}

export default App;