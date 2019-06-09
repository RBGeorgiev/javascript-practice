import React from "react";

const Card = (props) => (
    <section>
        <img src={props.image} alt="info image" /> {props.info}
    </section>
);

export default Card;