import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import img_test from "../img/12834900997792436.jpg";

const Product = () => {
    return (
        <article>
            <a href="#">
                <img src={img_test} />

                <h4>Product Title</h4>
                <p>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </p>
            </a>
        </article>
    )
}
export default Product;