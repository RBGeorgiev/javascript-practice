import React from 'react';
import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart'
import Button from 'react-bootstrap/Button'


class Cart extends React.Component {
    removeItem(item) {
        let idx = this.props.cart.indexOf(item);
        this.props.cart.splice(idx, 1);
        this.props.updateCart(Array.from(this.props.cart));
    }

    changeQuantity(e, item) {
        let idx = this.props.cart.indexOf(item);

        this.props.cart[idx].quantity = e.target.value;

        this.props.updateCart(Array.from(this.props.cart));
    }

    createCartItem(item) {
        return (
            <div key={item.sku} className="cart-item">
                <img src={require(`../img/${item.sku}.jpg`)} alt={item.name} />
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-desc">
                        <div className="cart-item-size">
                            <span>Size: </span>
                            <select>
                                {item.availableSizes.map(el => <option key={el} value={el}>{el}</option>)}
                            </select>
                            <span>Qty: </span>
                            <select value={item.quantity} onChange={(e) => this.changeQuantity(e, item)}>
                                {Array(10).fill().map((el, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                            </select>
                        </div>
                        <div>{item.quantity}</div>
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
        let totalPrice = this.props.cart.reduce((tot, cur) => tot += cur.price, 0).toFixed(2);

        return (
            <div className="cart">
                <div className="cart-shelf-container">
                    <p>Shopping Cart</p>
                    {this.props.cart.length > 0 &&
                        this.props.cart.map(item => this.createCartItem(item))
                    }
                </div>
                <div className="cart-footer">
                    <div className="cart-total-container">
                        <span>Total: </span>
                        <span className="cart-total-price">£{totalPrice}</span>
                    </div>
                    <Button className="cart-buy-btn" variant="dark" size="lg" block onClick={() => alert(`Checkout - Total: £${totalPrice}`)}>CHECKOUT</Button>
                </div>
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