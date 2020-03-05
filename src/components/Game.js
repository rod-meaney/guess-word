import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Countdown from 'react-countdown'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { StarFill, TrashFill } from 'react-bootstrap-icons';
import "./Game.css"
import { Link } from 'react-router-dom';

class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime:Date.now() + 5000
    }
  }

  clockRenderer ({ hours, minutes, seconds, completed }) {
    if (completed) {
      // Render a completed state
      return <span>Done</span>;
    } else {
      // Render a countdown
      return <span>{minutes}:{seconds}</span>;
    }
  };

  render(){
    return (
      <>
        <center>
          <h1>{this.props.displayWord}</h1>
          {"Time remaining: "}
          <Countdown 
            date={this.state.startTime} 
            onComplete={this.props.countdownComplete}
            renderer={this.clockRenderer}/>
        </center>
        <br />
        <Row>
          <Col>
            <Button variant="outline-success" className="btn-block" onClick={() => this.props.correct()}>Correct</Button> {" "}
          </Col>
          <Col>
            <Button variant="outline-danger"  className="btn-block" onClick={() => this.props.wrong()}>Wrong</Button>
          </Col>
        </Row>
      </>
    )
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: '1',
      name: 'Silmarillion words',
      description: 'Words from the Tolkein book the Silmarillion.',
      allWords: ['Morgoth', "Feanor", "Fingolfin", "Ungoliant", "Eren and Luthian", "Bleesed Isles", "Sauron", "Balrog", "Glaurung"],
      wordsRemaining: [],
      guessedCorrect:0,
      guessedWrong:0,
      guessedWords:[],
      phase:"screen",
      currentWord:"",
      mdShow:false,
    }
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
          </p>
          <Button variant="primary" onClick={() => this.setState({phase:"screen"})}>Play again</Button>{" "}
          <Link to="/game-list"><Button variant="primary">Play other lists</Button></Link>
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
      mdShow:true
    });
  }

 componentDidMount() {
   let parts = window.location.href.split('/');
   let id = parts[parts.length-1];
   //Get the data
   let data = {"1":{"title":"Silmarillion", "description":"Words from the silmarillion.  For people beyond LOTR!","words":[
        'Morgoth', "Feanor", "Fingolfin", "Ungoliant", "Eren and Luthian", "Bleesed Isles", "Sauron", "Balrog", "Glaurung"
      ]},
      "2":{"title":"Disney", "description":"Disney words from the movies and books","words":[
        "Mickey Mouse","Daffy Duck"
      ]},
      "3":{"title":"Fortnite", "description":"The game fortnite is huge, these words are from it","words":[
        "Hamburgler","Big Jug"
      ]},
      "4":{ "title":"Garfield", "description":"Words fromt he lovable cartoon Garfield","words":[
        "Garfield","Odie","Jon","Nermal", "Lasagne", "I hate Mondays", "Arlene"
      ]},
    };
    this.setState({
      id: id,
      name: data[id].title,
      description: data[id].description,
      allWords: data[id].words,
    });
 }

  startScreen() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Text>{this.state.description}</Card.Text>
          <Button variant="primary" onClick={() => this.startGame()}>Play</Button>
        </Card.Body>
        <Modal
          size="lg"
          show={this.state.mdShow}
          onHide={() => this.setState({mdShow:false})}
          onEnter={this.loadModal.bind(this)}
        >
          <Modal.Body>
            <GameScreen 
              ref={this.gameScreenRef}
              correct={this.handleCorrect.bind(this)}
              wrong={this.handleWrong.bind(this)}
              displayWord={this.state.currentWord}
              countdownComplete={this.timesUp.bind(this)}
            />
          </Modal.Body>
        </Modal>
      </Card>
    )  
  }

  render() {
    switch (this.state.phase) {
      case "finished":
        return this.finishScreen();
      default:
        return this.startScreen();
    }  
  }
}
export default Game;