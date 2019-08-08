import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { updateCart } from '../store/update-cart'


class Cart extends React.Component {
    removeItem(item) {
        let idx = this.props.cart.indexOf(item);
        this.props.cart.splice(idx, 1);
        this.props.updateCart(Array.from(this.props.cart));
    }

    createCartItem(item) {
        return (
            <div key={item.sku} className="cart-item">
                <img src={require(`../img/${item.sku}.jpg`)} alt={item.name} />
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-desc">
                        Free Shipping: {(item.isFreeShipping) ? 'Yes' : 'No'}
                        <br />
                        Available Sizes: {item.availableSizes.join(' ')}
                        <br />
                        Quantity: {item.quantity}
                    </div>
                </div>
                <div className="cart-item-price">
                    {item.currencyFormat}{item.price.toFixed(2)}
                    <Button className="cart-item-delete-btn" variant="outline-secondary" size="sm" onClick={() => this.removeItem(item)}>X</Button>
                </div>
            </ div >

        )
    }

    render() {
        return (
            <div className="cart">
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

export default connect(mapStateToProps, { updateCart })(Cart);