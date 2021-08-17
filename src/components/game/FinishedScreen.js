import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { StarFill, TrashFill, ExclamationCircle } from 'react-bootstrap-icons';
import FAQ from '../FAQ';

const FinishedScreen = ({game, playAgain}) => {
  return (
    <Card>
    <Card.Body>
      <Card.Title>{game.name}</Card.Title>
      <h2>Score : {game.guessedCorrect}</h2>
      <p>
        {game.guessedWords.map((item,index) => (
          <span key={index}>
            {item.result ? <StarFill className="text-success sz-md" /> : <TrashFill className="text-danger" />} {item.word}<br />
          </span>
        ))}
        <ExclamationCircle className="text-warning" /> {game.currentWord}<br />
      </p>
      <Button variant="primary" onClick={() => playAgain()}>Play again</Button>{" "}
      <Link to="/public-game-list"><Button variant="primary">Play other lists</Button></Link>
      <br /><br />
      <FAQ helplist={["How to play?", "How to play with a keyboard?"]} />
    </Card.Body>
  </Card>
  )
}

export default FinishedScreen;