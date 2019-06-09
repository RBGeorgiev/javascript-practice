import React from 'react';
import './App.css';
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  return (
    <div className="App">
      <Header />

      <Main />

      <footer>
        <h3>V2 Tattenhoe St, Milton Keynes MK4 4DA</h3>
        <p>Camp Woodhill</p>
      </footer>
    </div>
  );
}

export default App;