import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Product = ({ product }) => {
    return (
        <article>
            <a href="#">
                <img src={require(`../img/${product.sku}.jpg`)} />

                <h4>{product.currencyFormat}{product.price.toFixed(2)}</h4>
                <p>
                    {product.name}
                </p>
                <p>
                    {(product.isFreeShipping) ? 'Free Shipping' : ''}
                </p>
            </a>
        </article>
    )
}
export default Product;