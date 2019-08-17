import React from "react";
import Product from "./product";
import Container from 'react-bootstrap/Container';
import AllProducts from "./products"

import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart'


class ProductList extends React.Component {
    handleClick(product) {
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

    sortProducts(products, order) {
        switch (order) {
            case 'low-to-high':
                return products = products.sort((a, b) => a.price - b.price);
            case 'high-to-low':
                return products.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    }

    render() {
        let filteredProducts = AllProducts.products.filter(el => {
            for (let size of this.props.filters) {
                if (!el.availableSizes.includes(size)) {
                    return false;
                }
            }
            return true;
        });

        filteredProducts = this.sortProducts(filteredProducts, this.props.order);

        return (
            <>
                <span>{filteredProducts.length} products found</span>
                <Container>
                    {
                        filteredProducts.map(product => {
                            return <Product store={this.props.store} product={product} key={product.sku} onClick={() => this.handleClick(product)} />;
                        })
                    }
                </Container>
            </>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        filters: state.filters,
        cart: state.cart,
        order: state.order
    }
}

export default connect(mapStateToProps, { updateCart })(ProductList);