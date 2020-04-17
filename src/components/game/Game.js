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
    this.currentWord="";
  }

  loadGame(data){
    //take the data and pre-populate the game
    let allItems = data.items.replace(/\r?\n/g, ",").trim().split(",");
    allItems = (allItems.map(x => x.trim())).filter(n => n);
    this.id=data.key;
    this.name=data.name;
    this.description=data.description;
    this.allWords = allItems;
  }

  startGame(){
    //reset all the values and assign the first word
    this.guessedWords=[];
    this.wordsRemaining=[].concat(this.allWords);
    this.guessedCorrect=0;
    this.guessedWrong=0;
    return this.pickWord();
  }

  pickWord(){
    //Check for empty list then randomly pick a word
    let result = "No more words in list!";
    if (this.wordsRemaining.length !== 0){
      let i = Math.floor(Math.random() * Math.floor(this.wordsRemaining.length));
      result=this.wordsRemaining[i];
      this.wordsRemaining.splice(i,1);
    }
    this.currentWord = result;
    return result;
  }

  correctWord() {
    //store data for final screen and pick next word
    this.guessedWords.push({"word":this.currentWord, "result":true});
    this.guessedCorrect++;
    return this.pickWord();
  }

  incorrectWord() {
    //store data for final screen and pick next word
    this.guessedWords.push({"word":this.currentWord, "result":false})
    this.guessedWrong++;
    return this.pickWord();
  }

}
export default Game;