import React from "react";
import Card from "./Card";
import Form from "./Form";
import CardInfo from "./Card-info";
import CardImages from "./Card-images";

const Main = () => (
    <main>
        <section id="info-cards">
            <Card image={CardImages.card_1} info={CardInfo.card_1} />
            <Card image={CardImages.card_2} info={CardInfo.card_2} />
            <Card image={CardImages.card_3} info={CardInfo.card_3} />
            <Card image={CardImages.card_4} info={CardInfo.card_4} />
            <Card image={CardImages.card_5} info={CardInfo.card_5} />
        </section>

        <section id="pricing">
            <h2>Price</h2>
            <p>Rent a single room cabin for 7 nights for £445</p>
            or
            <p>Rent the whole camp for £2199/night (maximum of 45 people)</p>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <Form />
        </section>
    </main>
);

export default Main;