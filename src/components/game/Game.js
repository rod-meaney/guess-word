class Game {
  constructor (props) {
    this.id='';
    this.name='';
    this.description='';
    this.allWords=[];
    this.wordsRemaining=[];
    this.guessedCorrect=0;
    this.guessedWrong=0;
    this.guessedWords=[];
    this.phase="screen";
    this.currentWord="";
    this.mdShow=false;
    this.errorMsg="";
  }
}
export default Game;