import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class FAQ extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showHelp:false,
      currentHelp:""
    }
  }

  handleCloseHelp(){this.setState({showHelp:false});}
  handleShowHelp(help) {this.setState({showHelp:true, currentHelp:help});}

  content() {
    switch (this.state.currentHelp) {
      case "How to play?":
        return(<>
          <p>When you start a game by pressing the play button the list you have selected to play</p>
          <ul>
            <li>You will have 3 seconds to place the device (recommend phone) longways on your forehead facing other people in the ready position.</li>
            <li>They need make you say the word on the screen without saying all or any part of the word.</li>
            <li>If you get it correct, roll the device so it would be face down for 1/2 a second.  Then roll it back up to the ready position.</li>
            <li>If you get it incorrect, roll the device so it would be face up for 1/2 a second.  Then roll it back down to the ready position.</li>
            <li>After 60 seconds, check your score.</li>
          </ul>
          </>);

      case "What is Device information about?":
        return(<>
          <p>This game uses device orientation to determine whether or not you have guessed the word.  This is not consistent across all devices and does not work on most desktop/laptops.</p>
          <p>Tilting the phone forward indicates you got the word right. Tilting the phone up indicates you do not know the word.</p>
          <p>As it is also a website, the access to the orientation function is also not consistent.  For example, </p>
          <ul>
            <li>later versions of iPhones and iPads require you to allow access on a site by site basis. They will see a Request device orientation button.</li>
            <li>earlier version of iPhone and iPads require you to allow access in the settings for safari. Once this is set they will see the </li>
            <li>tests on other devices will keep on happening and I will update the application as the way they work are incorporated</li>
          </ul>
          </>);

      case "Why would I login?":
        return(<>
          <p>Login uses Google Authentication?</p>
          <p>The application developer has no control over this and has no access to your google information.  The application uses google authentication for the following functionality:</p>
          <ul>
            <li>Allow you to create your own lists. If you want you can make it so only YOU see them (make them private)</li>
            <li>Future functionality. The ability to rate lists then find your favourite lists, and anything else people may come up with.</li>
          </ul>
          </>);

      default:
        break;
    }
  }

  render() {
    let currentFAQ = ["How to play?", "What is Device information about?", "Why would I login?"];
    if (this.props.help) {
      currentFAQ=[this.props.help];
    }
    return (
      <>
        <ListGroup>{currentFAQ.map((item)=>(
          <ListGroup.Item key={item} action onClick={() => this.handleShowHelp(item)}>{item}</ListGroup.Item>
        ))}
        </ListGroup>
        <Modal show={this.state.showHelp} onHide={this.handleCloseHelp.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.currentHelp}</Modal.Title>
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

export default FAQ;