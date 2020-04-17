import React from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ErrorScreen = ({errorMsg}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Whoops! That was not meant to happen :-(</Card.Title>
        <p><Alert variant="danger">{errorMsg}</Alert></p>
        <p><Link to="/"><Button variant="danger">Home</Button></Link></p>
      </Card.Body>
    </Card>
  )
}

export default ErrorScreen;