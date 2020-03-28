import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';
import ErrorMsg from './ErrorMsg'

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
          <ChevronRight />
          </Link>
        </span>
      </ListGroup.Item>
    );
  }
}

class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games:[],
      errorMsg:""
    }
  }

  componentDidMount(){
    let that = this;
    fetch(process.env.REACT_APP_URL+`/api/${this.props.api}`)
    .then(results => {
      return results.json()})
    .then(data => {
      if (data["error"]){that.setState({errorMsg:data["error"]})} else {that.setState({games:data}); }
    }).catch(function(error) {
      that.setState({errorMsg:"Fetch has failed so defaulting in some data for local testing."})
      let data = [{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"}];
      that.setState({games:data}); 
   });
  }

  noItems() {
    return this.state.games.length===0?(<ListGroup.Item>Currently no items</ListGroup.Item>):"";
  }

  handleShowError() {if (this.state.errorMsg===""){return false;} else {return true;}}
  handleCloseError(){this.setState({errorMsg:""})}
  getErrorMsg(){return this.state.errorMsg;}

  render() {
    return (
      <>
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
            {this.noItems()}
          </ListGroup>
        </Card.Body>
      </Card>
      <ErrorMsg 
        showError={this.handleShowError()}
        hideError={this.handleCloseError.bind(this)}
        getError={this.getErrorMsg.bind(this)}
        />
      </>
    );
  }
}

export default GameList;