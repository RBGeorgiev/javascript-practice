import React from 'react';

const CartIcon = ({ totalQuantity }) => {
    return (
        <div className="cart-icon">
            <span className="cart-image">
                <span className="cart-image-quantity">{totalQuantity}</span>
            </span>
        </div>
    )
}

export default CartIcon;