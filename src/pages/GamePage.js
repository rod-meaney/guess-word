import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
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
    this.state = {
      phase:"screen",
      currentWord:"",
      mdShow:false,
      errorMsg:"",
    }
    this.game = new Game();
    this.listService = new ListService();
    this.gameReturnHandle = this.gameReturnHandle.bind(this);
    this.gameErrorHandle = this.gameErrorHandle.bind(this);
    this.finishedReadySet = this.finishedReadySet.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.handleWrong = this.handleWrong.bind(this);
    this.timesUp = this.timesUp.bind(this);
    this.handlePlayAgain = this.handlePlayAgain.bind(this);

  }

  gameTime(){
    let getTime = localStorage.getItem('gameTime');
    if (getTime === null) {return 60;} else {return parseInt(getTime);}
  }
  
  gameReturnHandle(data){
    this.game.loadGame(data);
    this.setState({currentWord:"loaded"}); //forcing reload of screen
  }

  gameErrorHandle(error){this.setState({errorMsg:error,phase:"error"});}

  componentDidMount() {
    //let parts = window.location.href.split('?id=');
    let parts = window.location.href.split('/');
    let id = parts[parts.length-1];
    this.listService.getList({key:id, result:this.gameReturnHandle, error:this.gameErrorHandle});
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
      return <ReadySetGoScreen finished={this.finishedReadySet} />
    } else {
      if (this.state.phase==="times up"){
        return <h1>Time is up!</h1>
      } else {
        return <GameScreen 
          ref={this.gameScreenRef}
          gameTime={this.gameTime()}
          correct={this.handleCorrect}
          wrong={this.handleWrong}
          displayWord={this.state.currentWord}
          countdownComplete={this.timesUp}
        />
      }
    }
  }

  modalFooter() {
    if (this.state.readySet || this.state.phase==="times up"){
      return <Button variant="secondary" onClick={() => this.finished()}>Close</Button>
    } else {
      //Playing
      return <>
          <Button variant="success" onClick={() => this.handleCorrect()}>Yes</Button>
          <Button variant="danger" onClick={() => this.handleWrong()}>No</Button>          
          <Button variant="secondary" onClick={() => this.finished()}>Close</Button>
        </ >
    }
  }

  handleSlide(time){
    this.setState({gameTiming:time});
    localStorage.setItem('gameTime', time);
  }

  render() {
    switch (this.state.phase) {
      case "finished":
        return <FinishedScreen game={this.game} playAgain={this.handlePlayAgain} />;
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
              <FAQ helplist={["How to play?", "How long is a game?", "How to play with a keyboard?"]} />
            </Card.Body>
            <Modal
              size="lg"
              show={this.state.mdShow}
            >
              <Modal.Body>
                <center>{this.modalBody()}</center>
              </Modal.Body>
              <Modal.Footer>
                {this.modalFooter()}
              </Modal.Footer>
            </Modal>
          </Card>
        );
    }  
  }
}

export default GamePage;