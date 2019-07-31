import React from 'react';
import './App.css';
import Product from "./components/product";
import Filter from "./components/filter";
import Cart from "./components/cart";

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
            <Product />
            <Product />
            <Product />
            <Product />
          </CardGroup>
          <br />
          <CardGroup>
            <Product />
            <Product />
            <Product />
            <Product />
          </CardGroup>
          <br />
          <CardGroup>
            <Product />
            <Product />
            <Product />
            <Product />
          </CardGroup>
          <br />
          <CardGroup>
            <Product />
            <Product />
            <Product />
            <Product />
          </CardGroup>
        </Container>
      </main>
      <Cart />
    </div >
  );
}

export default App;