import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Countdown from 'react-countdown';

class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime:Date.now() + (this.props.gameTime*1000),
      answerLastPlayed:new Date(),
      answerTimeDiff:1500,
      answerDegreeVar:25,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      windowWith: window.innerWidth,
    }
  }

  //Handles the phone orientation and keyboard pressing if using a computer
  componentDidMount(){
    window.addEventListener("deviceorientation", this.handleOrientation);
    window.addEventListener("keyup", this.handleKeyUp);
  }
  componentWillUnmount(){
    window.removeEventListener("deviceorientation", this.handleOrientation);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  approx(value) {
    if (value != null){return value.toFixed(2);}
    return 0; 
  }

  handleKeyUp = (event) => {
    //simpler handling for keyboard
    if (event.code==="KeyY"){
      this.props.correct();
    } else {
      this.props.wrong();
    }
  }

  handleOrientation = (event) => {
    this.setState({
      ori_x:this.approx(event.alpha),
      ori_y:this.approx(event.beta),
      ori_z:this.approx(event.gamma)
    });
    this.checkPlay();
  } 

  checkPlay(){
    if ((new Date() - this.state.answerLastPlayed)>this.state.answerTimeDiff){
      //Its been answerTimeDiff/1000 seconds since tune was played
      if ((Math.abs(this.state.ori_y) > (180-this.state.answerDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.answerDegreeVar)))){
          //When phone sideways, y is near 180, z is near 0 - phone tilted forward
          this.setState({answerLastPlayed:new Date()});
          this.props.correct();
      }
      if ((Math.abs(this.state.ori_y) < (0+this.state.answerDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.answerDegreeVar)))){
        //When phone sideways, y is near 0, z is near 0
        this.setState({answerLastPlayed:new Date()});
        this.props.wrong();
      }
    }
  }

  clockRenderer ({ hours, minutes, seconds, completed }) {
    if (completed) {
      // Render a completed state
      return <span>Done</span>;
    } else {
      // Render a countdown
      //return <span>{(minutes*60)+seconds} seconds</span>;
      return <ProgressBar animated min={0} max={this.props.gameTime} now={(minutes*60)+seconds} />
    }
  };

  render(){
    return (
      <>
        <br />
        <h1>{this.props.displayWord}</h1>
        {"Time remaining: "}
        <Row>
          <Col xs="12">
          <Countdown 
          date={this.state.startTime} 
          onComplete={this.props.countdownComplete}
          renderer={this.clockRenderer.bind(this)}/>
          </Col>
        </Row>
        
        <br /><br />
      </>
    )
  }
}

export default GameScreen;