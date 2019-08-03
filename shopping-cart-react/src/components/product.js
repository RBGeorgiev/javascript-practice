import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Product = ({ product }) => {
    return (
        <article className="shelf-item-container">

            <img src={require(`../img/${product.sku}.jpg`)} />

            <div className="shelf-item-name">{product.name}</div>
            <div className="shelf-item-price">{product.currencyFormat}{product.price.toFixed(2)}</div>
            <span>{(product.isFreeShipping) ? 'Free Shipping' : ''}</span>
            <div className="shelf-item-buy-btn">Add to cart</div>

        </article>
    )
}
export default Product;