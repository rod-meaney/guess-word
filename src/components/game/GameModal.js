import React from 'react';
import Countdown from 'react-countdown';

class GameModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime:Date.now() + 60000,
      answerLastPlayed:new Date(),
      answerTimeDiff:2000,
      answerDegreeVar:25,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      windowWith: window.innerWidth,
    }
  }

  //Handles the phone orientation
  componentDidMount(){
    window.addEventListener("deviceorientation", this.handleOrientation);
    
  }
  componentWillUnmount(){
    window.removeEventListener("deviceorientation", this.handleOrientation);
  }

  approx(value) {
    if (value != null){return value.toFixed(2);}
    return 0; 
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
      return <span>{(minutes*60)+seconds} seconds</span>;
    }
  };

  render(){
    return (
      <>
        <br />
        <h1>{this.props.displayWord}</h1>
        {"Time remaining: "}
        <Countdown 
          date={this.state.startTime} 
          onComplete={this.props.countdownComplete}
          renderer={this.clockRenderer}/>
        <br /><br />
      </>
    )
  }
}

export default GameModal;