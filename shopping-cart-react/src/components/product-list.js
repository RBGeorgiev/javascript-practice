import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';
import AllProducts from "./products"

import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart'


class ProductList extends React.Component {
    componentDidMount() {
        this.cartProducts = [];
    }

    handleClick(product) {
        if (this.cartProducts.includes(product)) {
            let idx = this.cartProducts.indexOf(product);
            this.cartProducts[idx].quantity++;
        } else {
            product.quantity = 1
            this.cartProducts.push(product);
        }

        this.props.updateCart(Array.from(this.cartProducts));
    }

    render() {
        const filteredProducts = AllProducts.products.filter(el => {
            for (let size of this.props.filters) {
                if (!el.availableSizes.includes(size)) {
                    return false;
                }
            }
            return true;
        });

        return (
            <Container>
                {
                    filteredProducts.map(product => {
                        return <Product store={this.props.store} product={product} key={product.sku} onClick={() => this.handleClick(product)} />;
                    })
                }
            </Container>
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