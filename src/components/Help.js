import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Help extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showHelp:false,
    }
  }

  handleCloseHelp(){this.setState({showHelp:false});}
  handleShowHelp() {this.setState({showHelp:true});}

  content() {
    switch (this.props.helpKey) {
      case "How to play":
        return(<>
          <p>When you get the game starting</p>
          <ul>
            <li>You will have 3 seconds to place the device (recommend phone) horizontally on your forehead facing other people in the ready position.</li>
            <li>They need make you say the word on the screen without saying all or any part of the word.</li>
            <li>If you get it correct, roll the device so it would be face down for 1/2 a second.  Then roll it back up to the ready position.</li>
            <li>If you get it incorrect, roll the device so it would be face up for 1/2 a second.  Then roll it back down to the ready position.</li>
            <li>After 60 seconds, check your score.</li>
          </ul>
          </>);

      case "What is this":
        return(<>
          <p>This game uses devlice orientation to say whether or not you have guessed the word or not.  This is not consistent across all devices and does not work on most desktop/laptops.</p>
          <p>As it is also a website, the access to the orientation function is also not consistent.  For example, </p>
          <ul>
            <li>later versions of iPhones and iPads require you to allow access on a site by site basis</li>
            <li>earlier version of iPhone and iPads require you to allow access in the settings for safari</li>
            <li>tests on other devices will keep on happening and I will update the application as the way they work are incorporated</li>
          </ul>
          </>);

      case "?":
        return(<>
          <p>Login uses google authentication.</p>
          <p>The application developer has no control over this and has no access to your google information.  The application uses google authentication for the following functionality:</p>
          <ul>
            <li>MM</li>
            <li>earlier version of iPhone and iPads require you to allow access in the settings for safari</li>
          </ul>
          </>);

      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Button variant="link" onClick={() => this.handleShowHelp()}>{this.props.helpKey}</Button>
        <Modal show={this.state.showHelp} onHide={this.handleCloseHelp.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.helpKey}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.content()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseHelp.bind(this)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )    
  }
}

export default Help;