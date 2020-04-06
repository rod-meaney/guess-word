import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import {footer} from './utils'
import FAQ from './FAQ';
import {
  Link
} from "react-router-dom";

class Home extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      can_play:false,
      request_orientation:true,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      available_message:<Alert variant="info">You have not requested orientation yet. To play this game click the 'Request orientation access' button.</Alert>
    }
  }

  componentDidMount(){window.addEventListener("deviceorientation", this.handleOrientation);}
  componentWillUnmount(){window.removeEventListener('deviceorientation', this.handleOrientation);}

  approx(value) {
    if (value != null){return value.toFixed(2);}
    return 0; 
  }

  handleOrientation = (event) => {
    this.setState({
      ori_x:this.approx(event.alpha),
      ori_y:this.approx(event.beta),
      ori_z:this.approx(event.gamma),
      can_play:true,
      request_orientation:false,
      available_message:<Alert variant="success">You are able to play.</Alert>
    });
  } 

  handleRequestOrientationButton() {
    if (window.DeviceOrientationEvent) {
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener("deviceorientation", this.handleOrientation);
          } else {
            this.setState({
              available_message:<Alert variant="danger">You need to 'Allow' access to Mation and Orientation for this application to work. You will need to close and re-open the browser to test again</Alert>
            });            
          }
        })
      } else {
        this.setState({
          available_message:
            <Alert variant="warning">
              It appears your device has orientation events, please check the following.
              <ul>
                <li>The url is using https - orientation requires this;</li>
                <li>Older iPhones require settings updated. Under Safari in settings is 'Motion and Orientation Access';</li>
                <li>You may not be able to play the App. Some browsers have this setting even though they are not on a device with an accelerometer;</li>
              </ul>
              Testing on all devices and browsers has not been done. Feel free to raise an issue with device and browser.
            </Alert>
        });
      }
    } else {
      this.setState({
        available_message:<Alert variant="danger">This device has no orientation event. You cannot play. Try another device or login and add some lists fo your own.</Alert>
      });
    }
  }

  playButton(){
    if (this.state.can_play) {
      return <Link to="/public-game-list"><Button variant="primary">Start playing</Button></Link>
    } else {
      if (this.state.request_orientation) {
        return (<Button onClick={() => this.handleRequestOrientationButton()} variant="dark">Request orientation access</Button>);
      } 
    }
  }

  render() {
    return (
      <>
        <Card>
          <Card.Body>
          <Card.Title>What-word-is-that!</Card.Title>
            <Card.Text>
              A game of guessing fun for all the family and your crazy friends. <br />
            </Card.Text>
            {this.playButton()}<p />
            {this.state.available_message}
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
                    <ListGroup>
                      <ListGroup.Item>alpha<span className="float-right">{this.state.ori_x}</span></ListGroup.Item>
                      <ListGroup.Item>beta<span className="float-right">{this.state.ori_y}</span></ListGroup.Item>
                      <ListGroup.Item>gamma<span className="float-right">{this.state.ori_z}</span></ListGroup.Item>
                    </ListGroup>
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

export default Home;