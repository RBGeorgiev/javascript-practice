import React from 'react';
import './App.css';

import Item from "./components/card";


import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import CardGroup from 'react-bootstrap/CardGroup'


function App() {
  return (
    <div className="App">
      <main>
        <Container>
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
          <br />
          <CardGroup>
            <Item />
            <Item />
            <Item />
            <Item />
          </CardGroup>
        </Container>
        {/* <Container>
          <Row>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
          </Row>
          <Row>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
          </Row>
          <Row>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
          </Row>
          <Row>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
          </Row>
          <Row>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
            <Col><Item /></Col>
          </Row>
        </Container> */}
      </main>
    </div >
  );
}

export default App;
