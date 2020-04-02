import React from 'react';
import Toast from 'react-bootstrap/Toast';

const styles = {
  position: 'absolute',
  top: 12,
  left: window.innerWidth/2-100
};

const ErrorMsg = ({showError, closeError, getError}) => {
  return (
    <Toast show={showError} 
      onClose={closeError}
      style={styles}
      delay={3000} 
      autohide
      >
    <Toast.Header>
      <strong className="mr-auto">Error</strong>
    </Toast.Header>
    <Toast.Body>Error : {getError()}</Toast.Body>
  </Toast>
  );
}

export default ErrorMsg;