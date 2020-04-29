import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
//import "../components/game/Game.css"
import FAQ from '../components/FAQ';
import ReadySetGoScreen from '../components/game/ReadySetGoScreen';
import GameScreen from '../components/game/GameScreen';
import FinishedScreen from '../components/game/FinishedScreen';
import ErrorScreen from '../components/ErrorScreen';
import Game from '../components/game/Game';
import ListService from '../services/ListService';

/*
The game page is fundamentally
  - A page that gets the running game data from the list service and stores it in this.game
  - Playing the game resets the game data and launches a modal
  - The modal has three states, ready, playing and times up
  - When times up has executed it shows a screen (stays on the page) with the game results
  - You can reload the same game, or go back to the games list
*/

class GamePage extends React.Component {
  constructor(props){
    super(props);
    let getTime = localStorage.getItem('gameTime');
    if (getTime === null) {getTime=60;} else {getTime=parseInt(getTime);}
    this.state = {
      phase:"screen",
      currentWord:"",
      mdShow:false,
      errorMsg:"",
      gameTiming:getTime
    }
    this.game = new Game();
    this.listService = new ListService();
  }

  gameReturnHandle(data){
    this.game.loadGame(data);
    this.setState({currentWord:"loaded"}); //forcing reload of screen
  }

  gameErrorHandle(error){this.setState({errorMsg:error,phase:"error"});}

  componentDidMount() {
    let parts = window.location.href.split('?id=');
    let id = parts[parts.length-1];
    this.listService.getList({key:id, result:this.gameReturnHandle.bind(this), error:this.gameErrorHandle.bind(this)});
  }

  finished(){this.setState({phase:"finished",mdShow:false});}
  timesUp() {
    this.setState({phase:"times up"});
    setTimeout(() => {this.finished()}, 1000)
  }
  finishedReadySet(){this.setState({readySet:false})}
  handleCorrect() {this.setState({currentWord:this.game.correctWord()});}
  handleWrong() {this.setState({currentWord:this.game.incorrectWord()});}
  handlePlayAgain(){this.setState({phase:"screen"});}

  startGame() {
    //Clear the slate and show the modal with Ready Set
    this.setState({
      currentWord:this.game.startGame(),
      mdShow:true,
      readySet:true
    });
  }

  modalBody(){
    if (this.state.readySet){
      return <ReadySetGoScreen finished={this.finishedReadySet.bind(this)} />
    } else {
      if (this.state.phase==="times up"){
        return <h1>Time is up!</h1>
      } else {
        return <GameScreen 
          ref={this.gameScreenRef}
          gameTime={this.state.gameTiming}
          correct={this.handleCorrect.bind(this)}
          wrong={this.handleWrong.bind(this)}
          displayWord={this.state.currentWord}
          countdownComplete={this.timesUp.bind(this)}
        />
      }
    }
  }

  handleSlide(time){
    this.setState({gameTiming:time});
    localStorage.setItem('gameTime', time);
  }

  render() {
    switch (this.state.phase) {
      case "finished":
        return <FinishedScreen game={this.game} playAgain={this.handlePlayAgain.bind(this)} />;
      case "error":
        return <ErrorScreen errorMsg={this.state.errorMsg} />;        
      default:
        return (
          <Card>
            <Card.Body>
              <Card.Title>{this.game.name}</Card.Title>
              <Card.Text>
                {this.game.description}
              </Card.Text>
              <Button variant="primary" onClick={() => this.startGame()}>Play</Button>
              <br /><br />
              <Row>
                <Col xs="2"></Col>
                <Col xs="8">
                  <center>Game time : {this.state.gameTiming} seconds</center>
                </Col>
                <Col xs="2"></Col>
              </Row>
              <center>
              <Row>
                <Col xs="2">10</Col>
                <Col xs="8">
                  
                  <RangeSlider
                    value={this.state.gameTiming}
                    onChange={slideStop => this.handleSlide(parseInt(slideStop.target.value))}
                    min={10}
                    max={120}
                    step={10}
                  />
                  
                </Col>
                <Col xs="2">120</Col>
              </Row>
              </center>
              <br /><br />
              <FAQ helplist={["How to play?", "How to play with a keyboard?"]} />
            </Card.Body>
            <Modal
              size="lg"
              show={this.state.mdShow}
            >
              <Modal.Body>
              <center>{this.modalBody()}</center>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => this.finished()}>Close</Button>
              </Modal.Footer>
              
            </Modal>
          </Card>
        );
    }  
  }
}

export default GamePage;