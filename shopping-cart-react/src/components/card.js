import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import img_test from "../img/img_test.jpg"

const Item = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img_test} />
            <Card.Body>
                <Card.Title>Item Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}
export default Item;


