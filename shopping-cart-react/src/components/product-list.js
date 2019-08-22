import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart';

class ProductList extends React.Component {
    addToCart(product) {
        // add item to cart or increase quantity if it's already present
        if (this.props.cart.includes(product)) {
            let idx = this.props.cart.indexOf(product);
            // stop adding quantity after 10
            if (this.props.cart[idx].quantity < 10) this.props.cart[idx].quantity++;
        } else {
            product.quantity = 1;
            this.props.cart.push(product);
        }

        this.props.updateCart(Array.from(this.props.cart));
    }

    render() {
        return (
            <Container>
                {
                    this.props.products.map(product => {
                        return <Product store={this.props.store} product={product} key={product.sku} onClick={() => this.addToCart(product)} />;
                    })
                }
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        filters: state.filters,
        cart: state.cart,
        order: state.order
    }
}

export default connect(mapStateToProps, { updateCart })(ProductList);