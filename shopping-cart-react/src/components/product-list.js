import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';
import AllProducts from "./products"


import { connect } from 'react-redux';


const ProductList = (props) => {

    const products = AllProducts.products.filter(el => {
        for (let size of props.items) {
            if (!el.availableSizes.includes(size)) {
                return false
            }
        }
        return true
    });

    return (
        <Container >
            {products.map(p => {
                return <Product product={p} key={p.id} />;
            })}
        </Container >
    )
};

const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(ProductList);