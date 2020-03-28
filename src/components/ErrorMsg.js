import React from 'react';
import Toast from 'react-bootstrap/Toast';

class ErrorMsg extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Toast show={this.props.showError} 
        onClose={this.props.hideError}
        style={{
          position: 'absolute',
          top: 12,
          left: window.innerWidth/2-100 ,
        }}
        delay={3000} 
        autohide
        >
      <Toast.Header>
        <strong className="mr-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>Error : {this.props.getError()}</Toast.Body>
    </Toast>
    );
  }
}

export default ErrorMsg;