import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    createCartItem(item) {
        return (
            <div key={item.sku} className="cart-item">
                <img src={require(`../img/${item.sku}.jpg`)} alt={item.name} />
                <div className="cart-item-details">
                    <p>{item.name}</p>
                    <div className="cart-item-desc">
                        Free Shipping: {(item.isFreeShipping) ? 'Yes' : 'No'}
                        <br />
                        Available Sizes: {item.availableSizes.join(' ')}
                        <br />
                        Quantity: {item.quantity}
                    </div>
                </div>
                <div className="cart-item-price">{item.currencyFormat}{item.price}</div>
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