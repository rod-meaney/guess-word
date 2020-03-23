import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key:this.props.id,
      description:this.props.description,
      name:this.props.name,
      private:this.props.private
    }
  }  
  render() {
    return(
      <ListGroup.Item>{this.state.name}
        <span className="float-right">
        <Link to={`/play?id=${this.state.key}`}>
          <ChevronRight /><ChevronRight />
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
    let that = this;
    fetch(process.env.REACT_APP_URL+'/api/search')
    .then(results => {
      return results.json()})
    .then(data => {
      that.setState({games:data}); 
    }).catch(function(error) {
      console.log('Fetch has failed so defaulting in some data for local testing.');
      let data = [{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"}];
      that.setState({games:data}); 
   });
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
            {this.state.games.map((item) => <GameItem 
                                              id={item.key}
                                              key={item.key}
                                              name={item.name}
                                              description={item.description}
                                              private={item.private}
                                              />)}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default AvailableGames;