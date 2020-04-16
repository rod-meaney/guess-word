import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import { StarFill, TrashFill, AlertCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import "../components/game/Game.css"
import ReadySetGoModal from '../components/game/ReadySetGoModal';
import GameModal from '../components/game/GameModal';
import Game from '../components/game/Game';
import ErrorMsg from '../components/ErrorMsg'; 
import FAQ from '../components/FAQ';
import ListService from '../services/ListService';

class GamePage extends React.Component {
  constructor(props){
    console.log('Making all the data in the state a class to pass around');
    super(props);
    this.state = {
      game:new Game(),
      id: '',
      name: '',
      description: '',
      allWords: [],
      wordsRemaining: [],
      guessedCorrect:0,
      guessedWrong:0,
      guessedWords:[],
      phase:"screen",
      currentWord:"",
      mdShow:false,
      errorMsg:"",
    }
    this.listService = new ListService();
  }

  timesUp() {
    this.setState({
      phase:"finished",
      mdShow:false,
    });
  }

  pickFirstWord() {
    let i = Math.floor(Math.random() * Math.floor(this.state.allWords.length));
    return this.state.allWords[i]
  }

  pickNextWord(){
    if (this.state.wordsRemaining.length === 0){
      this.setState({currentWord:"No more words in list!"})
    } else {
      let i = Math.floor(Math.random() * Math.floor(this.state.wordsRemaining.length));
      this.setState({currentWord:this.state.wordsRemaining[i]})
      this.state.wordsRemaining.splice(i,1);
    }
  }

  handleCorrect() {
    this.state.guessedWords.push({"word":this.state.currentWord, "result":true});
    this.setState({guessedCorrect:this.state.guessedCorrect+1});
    this.pickNextWord();
  }

  handleWrong() {
    this.state.guessedWords.push({"word":this.state.currentWord, "result":false})
    this.setState({guessedWrong:this.state.guessedWrong+1});
    this.pickNextWord();
  }

  resultIcon(answer) {
    return (answer ? <StarFill className="text-success sz-md" /> : <TrashFill className="text-danger" />);
  }

  finishScreen() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <h2>Score : {this.state.guessedCorrect}</h2>
          <p>
            {this.state.guessedWords.map((item,index) => (
              <span key={index}>
                {this.resultIcon(item.result)} {item.word}<br />
              </span>
            ))}
            <AlertCircle className="text-warning" /> {this.state.currentWord}<br />
          </p>
          <Button variant="primary" onClick={() => this.setState({phase:"screen"})}>Play again</Button>{" "}
          <Link to="/public-game-list"><Button variant="primary">Play other lists</Button></Link>
          <br /><br />
          <FAQ helplist={["How to play?"]} />
        </Card.Body>
      </Card>
    )
  }

  loadModal(){
    let i = this.state.wordsRemaining.indexOf(this.state.currentWord);
    this.state.wordsRemaining.splice(i,1);
  }

  startGame() {
    //Clear the slate and show the modal with the first word
    this.setState({
      guessedWords:[],
      wordsRemaining:[].concat(this.state.allWords),
      currentWord:this.pickFirstWord(),
      guessedCorrect:0,
      guessedWrong:0,
      mdShow:true,
      readySet:true
    });
  }

  gameReturn(data){
    let allItems = data.items.replace(/\r?\n/g, ",").trim().split(",");
    allItems = (allItems.map(x => x.trim())).filter(n => n);
    this.setState({id: data.key, name: data.name, description: data.description, allWords: allItems}); 
  }

  gameError(error){this.setState({errorMsg:error,phase:"error"});}

  componentDidMount() {
    let parts = window.location.href.split('?id=');
    let id = parts[parts.length-1];
    this.listService.getList({key:id, result:this.gameReturn.bind(this), error:this.gameError.bind(this)});
  }

  finishedReadSet(){
    this.setState({readySet:false})
  }

  handleShowError() {if (this.state.errorMsg===""){return false;} else {return true;}}
  handleCloseError(){this.setState({errorMsg:""})}
  getErrorMsg(){return this.state.errorMsg;}
  errorScreen(){
    return (
      <Card>
      <Card.Body>
        <Card.Title>Error Loading</Card.Title>
        <p><Alert variant="danger">{this.state.errorMsg}</Alert></p>
        <p><Link to="/"><Button variant="danger">Home</Button></Link></p>
      </Card.Body>
    </Card>
    );
  }

  modalBody(){
    if (this.state.readySet){
      return <ReadySetGoModal finished={this.finishedReadSet.bind(this)} />
    } else {
      return <GameModal 
          ref={this.gameScreenRef}
          correct={this.handleCorrect.bind(this)}
          wrong={this.handleWrong.bind(this)}
          displayWord={this.state.currentWord}
          countdownComplete={this.timesUp.bind(this)}
        />
    }
  }

  startScreen() {
    return (
      <>
      <Card>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Text>
            {this.state.description}
          </Card.Text>
          <Button variant="primary" onClick={() => this.startGame()}>Play</Button>
        </Card.Body>
        <Modal
          size="lg"
          show={this.state.mdShow}
          onEnter={this.loadModal.bind(this)}
        >
          <Modal.Body>
            {this.modalBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.timesUp()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Card>
      <ErrorMsg 
        showError={this.handleShowError()}
        closeError={this.handleCloseError.bind(this)}
        getError={this.getErrorMsg.bind(this)}
        />
      </>
    )  
  }

  render() {
    switch (this.state.phase) {
      case "finished":
        return this.finishScreen();
      case "error":
        return this.errorScreen();        
      default:
        return this.startScreen();
    }  
  }
}

export default GamePage;