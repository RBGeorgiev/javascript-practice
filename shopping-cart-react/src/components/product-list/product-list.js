import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';

import { connect } from 'react-redux';
import { updateCart } from '../../store/update-cart/update-cart';

class ProductList extends React.Component {
    addToCart(product) {
        let idx,
            inCart = false;

        // Array.includes and Array.indexOf don't recognize cart items coming from local storage and thus create duplicates in the cart. 
        // https://stackoverflow.com/a/14958115
        // the for loop is a workaround/fix
        for (let cartItem of this.props.cart) {
            if (cartItem.sku === product.sku) {
                inCart = true;
                idx = this.props.cart.indexOf(cartItem);
                break;
            }
        }

        // add item to cart or increase quantity if it's already present
        if (inCart) {
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
                        return <Product key={product.sku} store={this.props.store} product={product} onClick={() => this.addToCart(product)} />;
                    })
                }
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        cart: state.cart
    }
}

export default connect(mapStateToProps, { updateCart })(ProductList);