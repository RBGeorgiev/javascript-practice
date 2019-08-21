import React from 'react';
import CartIcon from './cart-icon';

const CartHeader = ({ totalQuantity }) => {
    return (
        <div className="cart-header">
            <CartIcon totalQuantity={totalQuantity} />
            <span>Shopping Cart</span>
        </div>
    )
}

export default CartHeader