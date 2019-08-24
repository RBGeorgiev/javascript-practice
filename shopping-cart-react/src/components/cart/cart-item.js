import React from 'react';
import Button from 'react-bootstrap/Button';

const CartItem = ({ item, removeItem, changeQuantity }) => {
    return (
        <div className="cart-item">
            <img src={require(`../../img/${item.sku}.jpg`)} alt={item.name} />

            <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-desc">
                    <div className="cart-item-size">
                        <span>Size: </span>
                        <select>
                            {item.availableSizes.map(el => <option key={el} value={el}>{el}</option>)}
                        </select>
                        <span>Qty: </span>
                        <select value={item.quantity} onChange={changeQuantity}>
                            {Array(10).fill().map((el, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="cart-item-right">
                <div className="cart-item-price">
                    <span className="cart-item-quantity">{item.quantity}x </span>
                    {item.currencyFormat}{item.price.toFixed(2)}
                </div>
                <Button className="cart-item-delete-btn" variant="outline-secondary" size="sm" onClick={removeItem}>X</Button>
            </div>
        </ div >

    )
}

export default CartItem;