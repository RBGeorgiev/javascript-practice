import React from 'react';
import { connect } from 'react-redux';
import { updateCart } from '../store/update-cart';
import Button from 'react-bootstrap/Button';
import CartItem from './cart-item';


class Cart extends React.Component {
    state = {
        cartOpen: false
    };

    toggleCart = () => {
        this.setState({ cartOpen: !this.state.cartOpen })
    }

    removeItem(item) {
        let idx = this.props.cart.indexOf(item);
        this.props.cart.splice(idx, 1);
        this.props.updateCart(Array.from(this.props.cart));
    }

    changeQuantity(e, item) {
        let idx = this.props.cart.indexOf(item);

        this.props.cart[idx].quantity = +e.target.value;

        this.props.updateCart(Array.from(this.props.cart));
    }

    render() {
        let totalPrice = this.props.cart.reduce((tot, cur) => tot += cur.price * cur.quantity, 0).toFixed(2);
        let totalQuantity = this.props.cart.reduce((tot, cur) => tot += cur.quantity, 0)

        return (
            <div className={`cart${(this.state.cartOpen) ? " cart-open" : ""}`}>
                <span className="cart-open-btn" onClick={this.toggleCart}>
                    {(this.state.cartOpen) ? 'X' :
                        <span className="cart-image">
                            <span className="cart-image-quantity">{totalQuantity}</span>
                        </span>}
                </span>

                <div className="cart-shelf-container">
                    <div className="cart-header">
                        <span className="cart-image">
                            <span className="cart-image-quantity">{totalQuantity}</span>
                        </span>
                        <span>Shopping Cart</span>
                    </div>

                    {this.props.cart.length > 0 &&
                        this.props.cart.map(item =>
                            <CartItem item={item} onClick={() => this.removeItem(item)} />
                        )
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