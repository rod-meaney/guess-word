import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
const GameTime = () => {
  let gameTime = localStorage.getItem('gameTime');
  if (gameTime === null) {gameTime=60;} else {gameTime=parseInt(gameTime);}

  const [ value, setValue ] = useState(gameTime);
  
  useEffect(() => {
    localStorage.setItem('gameTime', value);
  });

  return (
    <>
      <Row>
        <Col>
          <center>Game time : {value} seconds</center>
        </Col>
      </Row>
      <Row>
      <Col>
      <center>
        <RangeSlider
          value={value}
          onChange={slideStop => setValue(parseInt(slideStop.target.value))}
          min={10}
          max={120}
          step={10}
        />
        </center>
      </Col>
    </Row>
    <Row>
      <Col className="text-left">10</Col>
      <Col className="text-right">120</Col>
    </Row>
  </>
  )
}
export default GameTime;