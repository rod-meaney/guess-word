import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {approx} from '../utils';

const OrientationDisplay = ({event}) => {
  
  const setX = () => {try {return approx(event.alpha)} catch {return 0;}}
  const setY = () => {try {return approx(event.beta)} catch {return 0;}}
  const setZ = () => {try {return approx(event.gamma)} catch {return 0;}}

  return (
    <ListGroup>
      <ListGroup.Item>alpha<span className="float-right">{setX()}</span></ListGroup.Item>
      <ListGroup.Item>beta<span className="float-right">{setY()}</span></ListGroup.Item>
      <ListGroup.Item>gamma<span className="float-right">{setZ()}</span></ListGroup.Item>
  </ListGroup>
  );
}
export default OrientationDisplay;