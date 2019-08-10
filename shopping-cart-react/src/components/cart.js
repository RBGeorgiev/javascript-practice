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

    createCartItem(item) {
        return (
            <div key={item.sku} className="cart-item">
                <img src={require(`../img/${item.sku}.jpg`)} alt={item.name} />
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-desc">
                        Free Shipping: {(item.isFreeShipping) ? 'Yes' : 'No'}
                        <div className="cart-item-size">
                            <span>Size: </span>
                            <select>
                                {item.availableSizes.map(el => <option key={el}>{el}</option>)}
                            </select>
                        </div>

                        <span>Qty: </span>
                        <select>
                            {Array(10).fill().map((el, i) => <option key={i + 1}>{i + 1}</option>)}
                        </select>
                        {/*{item.quantity}*/}
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
                <div className="cart-footer" onClick={console.log(this.props.cart)}>
                    Total: {this.props.cart.reduce((tot, cur) => tot += cur.price, 0).toFixed(2)}
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