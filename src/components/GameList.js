import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';
import ErrorMsg from './ErrorMsg';
import Fetching from './Fetching';

class GameItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key:this.props.id,
      description:this.props.description,
      name:this.props.name,
      private:this.props.private,
      loading:false
    }
  }  
  render() {
    return(
      <ListGroup.Item action href={`/play?id=${this.state.key}`}>{this.state.name}
        <span className="float-right"><ChevronRight /></span>
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
    this.setState({loading:true});  
    fetch(process.env.REACT_APP_URL+`/api/${this.props.api}`)
    .then(results => {
      return results.json()})
    .then(data => {
      if (data["error"]){that.setState({errorMsg:data["error"]})} else {that.setState({games:data}); }
    }).catch(function(error) {
      that.setState({errorMsg:"Fetch has failed so defaulting in some data for local testing."})
      let data = [{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, 
                  {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"},
                  {"key": "test", "private": false, "name": "Fun Test", "description": "Testing"}];
      that.setState({games:data}); 
   }).finally(()=>{this.setState({loading:false});});
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
            <Fetching message="Loading.." loading={this.state.loading} />
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