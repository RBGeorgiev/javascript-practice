import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Product = (props) => {
    return (
        <article className="shelf-item-container" onClick={props.onClick} >
            {props.product.isFreeShipping && (
                <div className="shelf-item-shipping">Free shipping</div>
            )}

            <img src={require(`../img/${props.product.sku}.jpg`)} alt={props.product.name} />

            <div className="shelf-item-name">{props.product.name}</div>
            <div className="shelf-item-price">{props.product.currencyFormat}{props.product.price.toFixed(2)}</div>
            <div className="shelf-item-buy-btn">Add to cart</div>

        </article>
    )
}

export default Product;