import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';
import AllProducts from "./products"


let products = AllProducts.products

const ProductList = () => {
    return (
        <Container >
            {products.map(p => {
                return <Product product={p} key={p.id} />;
            })}
        </Container >
    )
};

export default ProductList;
