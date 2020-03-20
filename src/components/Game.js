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
import correctSound from '../media/correct.wav';
import incorrectSound from '../media/incorrect.wav';

class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime:Date.now() + 60000,
      soundLastPlayed:new Date(),
      soundTimeDiff:2000,
      soundDegreeVar:20,
      ori_x:0,
      ori_y:0,
      ori_z:0,
      windowWith: window.innerWidth
    }
  }

  //Sounds used in either case
  audio_correct = new Audio(correctSound);
  audio_incorrect = new Audio(incorrectSound);

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
    if ((new Date() - this.state.soundLastPlayed)>this.state.soundTimeDiff){
      //Its been soundTimeDiff/1000 seconds since tune was played
      if ((Math.abs(this.state.ori_y) > (180-this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
          //When phone sideways, y is near 180, z is near 0 - phone tilted forward
          this.setState({soundLastPlayed:new Date()});
          this.audio_correct.play();
          this.props.correct();
      }
      if ((Math.abs(this.state.ori_y) < (0+this.state.soundDegreeVar)) && ((Math.abs(this.state.ori_z) < (0+this.state.soundDegreeVar)))){
        //When phone sideways, y is near 0, z is near 0
        this.setState({soundLastPlayed:new Date()});
        this.audio_incorrect.play();
        this.props.wrong();
      }
    }
  }

  //handles buttons used
  handleCButtonPushed(correct){
    if (correct){
      this.props.correct();
      this.audio_correct.play();
    } else {
      this.props.wrong();
      this.audio_incorrect.play();
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
            <Button variant="outline-success" className="btn-block" onClick={() => this.handleCButtonPushed(true)}>Correct</Button> {" "}
          </Col>
          <Col>
            <Button variant="outline-danger" className="btn-block" onClick={() => this.handleCButtonPushed(false)}>Wrong</Button>
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
    }
    //this.handleMotion = this.handleMotion().bind(this);
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
    let parts = window.location.href.split('?id=');
    let id = parts[parts.length-1];
    let that = this;
    fetch(`${process.env.REACT_APP_URL}/api/get?id=${id}`)
    .then(results => {return results.json()})
    .then(data => {  
      that.setState({id: id, name: data.name, description: data.description, allWords: data.items.split(",")});
    }).catch(function(error) {
      console.log('Fetch has failed so defaulting in some data for local testing.');
      let data = {"aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr", "items": "Abyssinian,Aegean,American Bobtail,American Curl,American Shorthair,American Wirehair,Aphrodite Giant,Arabian Mau,Asian cat,Asian Semi-longhair,Australian Mist,Balinese,Bambino,Bengal,Birman,Bombay,Brazilian Shorthair,British Longhair,British Shorthair,Burmese,Burmilla,California Spangled,Chantilly-Tiffany,Chartreux,Chausie,Colourpoint Shorthair,Cornish Rex,Cymric,Longhaired Manx,Cyprus,Devon Rex,Donskoy,Don Sphynx,Dragon Li,Dwelf,Egyptian Mau,European Shorthair,Exotic Shorthair,Foldex,German Rex,Havana Brown,Highlander,Himalayan,Japanese Bobtail,Javanese,Khao Manee,Korat,Korean Bobtail,Korn Ja,Kurilian Bobtail\u00a0or,Kuril Islands Bobtail,LaPerm,Lykoi,Maine Coon,Manx,Mekong Bobtail,Minskin,Napoleon,Munchkin,Nebelung,Norwegian Forest Cat,Ocicat,Ojos Azules,Oregon Rex,Oriental Bicolor,Oriental Longhair,Oriental Shorthair,Persian,Peterbald,Pixie-bob,Ragamuffin,Ragdoll,Raas,Russian Blue,Russian White,Black,and Tabby,Sam sawet,Savannah,Scottish Fold,Selkirk Rex,Serengeti,Serrade Petit,Siberian,Neva Masquerade,Singapura,Snowshoe,Sokoke,Somali,Sphynx,Suphalak,Thai,Thai Lilac,Tonkinese,Toyger,Turkish Angora,Turkish Van,Ukrainian Levkoy,Wila Krungthep,York Chocolate"},
                  "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies", "items": "Labrador Retrievers,German Shepherd Dogs,Golden Retrievers,French Bulldogs,Bulldogs,Beagles,Poodles,Rottweilers,German Shorthaired Pointers,Yorkshire Terriers,Boxers,Dachshunds,Pembroke Welsh Corgis,Siberian Huskies,Australian Shepherds,Great Danes,Doberman Pinschers,Cavalier King Charles Spaniels,Miniature Schnauzers,Shih Tzu,Boston Terriers,Bernese Mountain Dogs,Pomeranians,Havanese,Shetland Sheepdogs,Brittanys,English Springer Spaniels,Pugs,Mastiffs,Cocker Spaniels,Vizslas,Cani Corsi,Chihuahuas,Miniature American Shepherds,Border Collies,Weimaraners,Maltese,Collies,Basset Hounds,Newfoundlands,Rhodesian Ridgebacks,West Highland White Terriers,Belgian Malinois,Shiba Inu,Chesapeake Bay Retrievers,Bichon Frises,Akitas,St. Bernards"},};
      that.setState({id: id, name: data[id].name, description: data[id].description, allWords: data[id].items.split(",")});
    });
  }

  startScreen() {
    return (
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