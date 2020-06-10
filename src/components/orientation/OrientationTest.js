import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
  Link
} from "react-router-dom";

const OrientationTest = ({canPlay, handleOrientation}) => {
  const [availableMessage, setAvailableMessage] = useState(<Alert variant="info">Your device needs to approve access to orientation events for this website. To play this game click the 'Device orientation access' button or use the menu to play with a keboard on a computer.</Alert>);

  const handleRequestOrientationButton = () => {
    if (window.DeviceOrientationEvent) {
      if (typeof window.DeviceMotionEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener("deviceorientation", handleOrientation);
            setAvailableMessage(
              <Alert variant="success">
                <p>Your device is ready to play.</p>
              </Alert>);
          } else {
            setAvailableMessage(
            <Alert variant="danger">
              <p>You need to 'Allow' access to Motion and Orientation for this application to work. You will need to close and re-open the browser to test again.</p>
              <p>However, you can use the menu and play with a keyboard on a computer if you like.</p>
            </Alert>);
          }
        })
      } else {
        canPlay = true;
        setAvailableMessage(
        <Alert variant="warning">
          <p>It appears your device has orientation events, please check the following.</p>
          <ul>
            <li>The url is using https - orientation requires this;</li>
            <li>Older iPhones require settings updated. Under Safari in settings is 'Motion and Orientation Access';</li>
            <li>You may not be able to play the App. Some browsers have this setting even though they are not on a device with an accelerometer;</li>
          </ul>
          <p>Testing on all devices and browsers has not been done. Feel free to raise an issue with device and browser</p>
          <p>However, you can use the menu and play with a keyboard on a computer if you like.</p>
        </Alert>)
      }
    } else {
      setAvailableMessage(
        <Alert variant="danger">
          <p>This device has no orientation event. You cannot play as the game is intended. Try another device or login and add some lists of your own.</p>
          <p>However, you can use the menu and play with a keyboard on a computer if you like.</p>
        </Alert>);
    }
  }

  const playButton = () => {
    if (canPlay) {
      return <Link to="/public-game-list"><Button variant="primary">Start playing</Button></Link>
    } else {
      return (<Button onClick={() => handleRequestOrientationButton()} variant="dark">Device orientation access</Button>);
    }
  }

  return (
    <>
      {playButton()} 
      <br /><br />
      {!canPlay ? availableMessage : ""}
    </>
  );
}
export default OrientationTest;