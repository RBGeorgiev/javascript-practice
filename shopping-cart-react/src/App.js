import React from 'react';
import './App.css';
import Item from "./components/card";
import Filter from "./components/filter";
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">

      {/* 
      // <> === React.Fragment
      <>
        <main>
          <Filter />
          <Shelf />
        </main>
        <FloatCart />
      </> 
      */}

      <main className="main">
        <Filter />

        <Container>
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
        </Container>
      </main>
    </div >
  );
}

export default App;