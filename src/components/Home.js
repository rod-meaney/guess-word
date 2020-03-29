import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Help from './Help';
import {
  Link
} from "react-router-dom";

class Home extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      //showHelp:false,
      can_play:false,
      request_orientation:true,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      available_message:<Alert variant="info">You have not requested orietnation yet. To play this game try the button below.</Alert>
    }
  }

  //handleCloseHelp(){this.setState({showHelp:false});}
  //handleShowHelp() {this.setState({showHelp:true});}

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
      return <Link to="/public-game-list"><Button variant="primary">Public lists</Button></Link>
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
              <Help helpKey="How to play" />
            </Card.Text>
            {this.playButton()}<p />
            <Card.Title>Testing orientation <Help helpKey="What is this" /></Card.Title>
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
      </>
    );
  }
}

export default Home;