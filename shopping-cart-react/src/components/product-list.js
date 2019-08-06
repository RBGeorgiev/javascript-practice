import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';
import AllProducts from "./products"

import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart'


class ProductList extends React.Component {

    componentDidMount() {
        this.cartProducts = new Set();
    }

    handleClick(product) {
        this.cartProducts.add(product.name);

        this.props.updateCart(Array.from(this.cartProducts));
    }

    render() {
        const filteredProducts = AllProducts.products.filter(el => {
            for (let size of this.props.filters) {
                if (!el.availableSizes.includes(size)) {
                    return false
                }
            }
            return true
        });

        return (
            <Container >
                {
                    filteredProducts.map(product => {
                        return <Product store={this.props.store} product={product} key={product.id} onClick={() => this.handleClick(product)} />;
                    })
                }
            </Container >
        )
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        cart: state.cart
    }
}

export default connect(mapStateToProps, { updateCart })(ProductList);