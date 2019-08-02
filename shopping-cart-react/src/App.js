import React from 'react';
import './App.css';
import Filter from "./components/filter";
import Cart from "./components/cart";
import ProductList from "./components/product-list"

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
        <ProductList />
      </main>
      <Cart />
    </div >
  );
}

export default App;