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

  pickFirstWord() {
    let i = Math.floor(Math.random() * Math.floor(this.allWords.length));
    return this.allWords[i];
  }

  pickNextWord(){
    if (this.wordsRemaining.length === 0){
      this.currentWord="No more words in list!";
    } else {
      let i = Math.floor(Math.random() * Math.floor(this.wordsRemaining.length));
      this.currentWord=this.wordsRemaining[i];
      this.wordsRemaining.splice(i,1);
    }
  }

  correctWord() {
    this.guessedWords.push({"word":this.currentWord, "result":true});
    this.guessedCorrect=this.guessedCorrect+1;
    this.pickNextWord();
  }

}
export default Game;