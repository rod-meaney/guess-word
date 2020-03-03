import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import HomeImage from '../images/home.jpg';
import {
  Link
} from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <Card>
        <Card.Img variant="top" src={HomeImage} style={{ width: '18rem' }} />
        <Card.Body>
          <Card.Title>Word guessing game</Card.Title>
          <Card.Text>
            A game of guessing fun for all the family and your crazy friends.
          </Card.Text>
          <Link to="/temp-play"><Button variant="primary">Get started</Button></Link>
        </Card.Body>
      </Card>
    );
  }
}

export default Home;