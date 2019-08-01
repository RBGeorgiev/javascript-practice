import React from 'react';
import './App.css';
import Product from "./components/product";
import Filter from "./components/filter";
import Cart from "./components/cart";

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
          <Product />
          <Product />
          <Product />
          <Product />
          <br />
          <Product />
          <Product />
          <Product />
          <Product />
          <br />
          <Product />
          <Product />
          <Product />
          <Product />
          <br />
          <Product />
          <Product />
          <Product />
          <Product />
        </Container>
      </main>
      <Cart />
    </div >
  );
}

export default App;