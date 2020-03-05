import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.id,
      description:this.props.description,
      title:this.props.title
    }
  }  
  render() {
    return(
      <ListGroup.Item>{this.state.title}
        <span className="float-right">
        <Link to={`/play/${this.state.id}`}>
          <ChevronRight />
          </Link>
        </span>
        
      </ListGroup.Item>
    );
  }
}

class AvailableGames extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games:[]
    }
  }

  componentDidMount(){
    //end state will be using fetch etc.
    let data = [{"id":"1", "title":"Silmarillion", "description":"Words from the silmarillion.  For people beyond LOTR!"},
                {"id":"2", "title":"Disney", "description":"Disney words from the movies and books"},
                {"id":"3", "title":"Fortnite", "description":"The game fortnite is huge, these words are from it"},
                {"id":"4", "title":"Garfield", "description":"Words fromt he lovable cartoon Garfield"},
                ];
    
    let loadingGames = data.map((item) => { 
      return (<GameItem 
        id={item.id} 
                key={`${item.id}`} 
                title={item.title} 
                description={item.description} 
              />)
    })
    this.setState({games:loadingGames});
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
            {this.state.games.map((item) => item)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default AvailableGames;