import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    createCartItem(item) {
        return (
            <div className="cart-item">
                <img height='200px' src={require(`../img/${item.sku}.jpg`)}></img>
                <p>Name: {item.name}</p>
                <p>Price: {item.currencyFormat}{item.price}</p>
                <p>Free Shipping: {(item.isFreeShipping) ? 'Yes' : 'No'}</p>
                <p>Available Sizes: {item.availableSizes}</p>
                <p>Quantity: </p>
            </div >

        )
    }

    render() {
        return (
            <div className="cart" >
                <p>Shopping Cart</p>
                {this.props.cart.length > 0 &&
                    this.props.cart.map(item => this.createCartItem(item))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(Cart);