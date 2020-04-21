import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import {footer} from '../components/utils'
import FAQ from '../components/FAQ';
import OrientationDisplay from '../components/orientation/OrientationDisplay';
import OrientationTest from '../components/orientation/OrientationTest';

class HomePage extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      orientationEvent:null,
      canPlay:false,
    }
  }

  componentDidMount(){window.addEventListener("deviceorientation", this.handleOrientation);}
  componentWillUnmount(){window.removeEventListener('deviceorientation', this.handleOrientation);}

  handleOrientation = (event) => {
    this.setState({
      orientationEvent:event,
      canPlay:true,
    });
  } 

  render() {
    return (
      <>
        <Card>
          <Card.Body>
          <Card.Title>What-word-is-that!</Card.Title>
            <Card.Text>
              Stick your phone on your forhead and try get the people around you to make you say the word on the phone.<br />
            </Card.Text>
            <OrientationTest canPlay={this.state.canPlay} handleOrientation={this.handleOrientation.bind(this)} />
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    FAQ
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <FAQ />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Device information
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>
                      The below is showing your devices orientation, which is used to play this game. If the numbers are not changing as you move the device, the game will not work for you.
                    </p>
                    <OrientationDisplay event={this.state.orientationEvent} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
          </Accordion>
            {footer()}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default HomePage;