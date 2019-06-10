import React from "react";
import Card from "./Card";
import Form from "./Form";
import CardInfo from "./Card-info";
import CardImages from "./Card-images";

const Main = () => (
    <main>
        <div id="info-cards">
            <Card image={CardImages.card_1} title={CardInfo.card_1.title} info={CardInfo.card_1.info} />
            <Card image={CardImages.card_2} title={CardInfo.card_2.title} info={CardInfo.card_2.info} className="reverse" />
            <Card image={CardImages.card_3} title={CardInfo.card_3.title} info={CardInfo.card_3.info} />
            <Card image={CardImages.card_4} title={CardInfo.card_4.title} info={CardInfo.card_4.info} className="reverse" />
            <Card image={CardImages.card_5} title={CardInfo.card_5.title} info={CardInfo.card_5.info} />
        </div>

        <div id="pricing">
            <h2>Pricing</h2>
            <p>Rent a single room cabin for 7 nights for £445</p>
            <p>or</p>
            <p>Rent the whole camp for £2199/night (maximum of 45 people)</p>
        </div>

        <div id="contact">
            <div>
                <h2>Contact</h2>
                <Form />
            </div>
        </div>
    </main>
);

export default Main;