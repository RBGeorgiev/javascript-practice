import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    createCartItem(item) {
        return (
            <div key={item.sku} className="cart-item">
                <img height='200px' src={require(`../img/${item.sku}.jpg`)} alt={item.name} />
                <p>Name: {item.name}</p>
                <p>Price: {item.currencyFormat}{item.price}</p>
                <p>Free Shipping: {(item.isFreeShipping) ? 'Yes' : 'No'}</p>
                <p>Available Sizes: {item.availableSizes}</p>
                <p>Quantity: {item.quantity}</p>
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