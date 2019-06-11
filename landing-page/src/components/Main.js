import React from "react";
import Card from "./Card";
import Form from "./Form";
import CardInfo from "./Card-info";
import CardImages from "./Card-images";

const Main = () => (
    <main>
        <div id="info-cards">
            <Card image={CardImages.cabin} title={CardInfo.cabin.title} info={CardInfo.cabin.info} />
            <Card image={CardImages.archery} title={CardInfo.archery.title} info={CardInfo.archery.info} className="reverse" />
            <Card image={CardImages.canoeing} title={CardInfo.canoeing.title} info={CardInfo.canoeing.info} />
            <Card image={CardImages.fishing} title={CardInfo.fishing.title} info={CardInfo.fishing.info} className="reverse" />
            <Card image={CardImages.teepees} title={CardInfo.teepees.title} info={CardInfo.teepees.info} />
        </div>

        <div id="pricing">
            <h2>Pricing</h2>
            <p>Rent a single cabin for 7 nights for £445</p>
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