import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  Link
} from "react-router-dom";

class Home extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      showHelp:false,
      can_play:false,
      request_orientation:true,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      available_message:<Alert variant="info">You have not requested orietnation yet.</Alert>
    }
  }

  handleCloseHelp(){this.setState({showHelp:false});}
  handleShowHelp() {this.setState({showHelp:true});}

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
          available_message:<Alert variant="warning">This device has orientation events but you need to check the device settings.  This is often related to the browser app you are using.</Alert>
        });
      }
    } else {
      this.setState({
        available_message:<Alert variant="danger">This device has no orientation event. You cannot play.</Alert>
      });
    }
  }

  playButton(){
    if (this.state.can_play) {
      return <Link to="/public-game-list"><Button variant="primary">Check out the lists</Button></Link>
    } else {
      return "";
    }
  }

  requestOrientationButton(){
    if (this.state.request_orientation) {
      return (<Button onClick={() => this.handleRequestOrientationButton()} variant="dark">Request orientation access</Button>);
    } else {
      return "";
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
              <Button variant="link" onClick={() => this.handleShowHelp()}>How to play</Button>
            </Card.Text>
            {this.playButton()}<p />
            <Card.Title>Testing orientation</Card.Title>
            {this.state.available_message}
            {this.requestOrientationButton()}<p />
            <p>
              The below is showing your devices orientation, which is used to play this game.
            </p>
            <ListGroup>
              <ListGroup.Item>alpha<span className="float-right">{this.state.ori_x}</span></ListGroup.Item>
              <ListGroup.Item>beta<span className="float-right">{this.state.ori_y}</span></ListGroup.Item>
              <ListGroup.Item>gamma<span className="float-right">{this.state.ori_z}</span></ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Modal show={this.state.showHelp} onHide={this.handleCloseHelp.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>How to play</Modal.Title>
          </Modal.Header>
          <Modal.Body>When you get the game starting<br /><br /> 
            <ul>
              <li>You will have 3 seconds to place the device (recommend phone horizontally) on your forehead facing other people in the ready position.</li>
              <li>They need make you say the word on the screen without saying all or any part of the word.</li>
              <li>If you get it correct, roll the device so it would be face down for 1/2 a second.  Then roll it back up to the ready position.</li>
              <li>If you get it incorrect, roll the device so it would be face up for 1/2 a second.  Then roll it back down to the ready position.</li>
              <li>After 60 seconds, check your score.</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseHelp.bind(this)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>        
      </>
    );
  }
}

export default Home;