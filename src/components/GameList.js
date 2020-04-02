import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';
import ErrorMsg from './ErrorMsg';
import Fetching from './Fetching';

class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games:[],
      errorMsg:"",
      loading:false,
      searchString:""
    }
  }

  getListItems(){
    let that = this;
    this.setState({loading:true});
    fetch(process.env.REACT_APP_URL+`/api/${this.props.api}?q=${this.state.searchString}`)
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

  componentDidMount(){
    this.getListItems();
  }

  noItems() {
    return !this.state.loading && this.state.games.length===0?(<ListGroup.Item>No items found</ListGroup.Item>):"";
  }

  updateSearch = (event) => {
    event.preventDefault(); 
    this.setState({searchString:event.target.value});
    //This is a bit hacky, on the TO-DO
    setTimeout(() => {if ((this.state.searchString.length===3) || (this.state.searchString.length===0)) this.getListItems();},200);
  }
  handleSubmit = event => {event.preventDefault();}
  showSearch(){
    if (this.props.showSearch){
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Row><Col>
                <Form.Group controlId="formSearch">
                  <Form.Control 
                    placeholder="Search (first 3 characters only)" 
                    type="text"
                    onChange={this.updateSearch}
                    maxLength="3"
                  />
                </Form.Group>
              </Col></Form.Row>
        </Form>
      );
    }
    return "";
  }

  handleShowError() {if (this.state.errorMsg===""){return false;} else {return true;}}
  handleCloseError(){this.setState({errorMsg:""})}
  getErrorMsg(){return this.state.errorMsg;}
    
  render() {
    return (
      <>
      <Card>
        <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
          {this.showSearch()}
          <ListGroup>
            <Fetching message="Loading.." loading={this.state.loading} />
            {this.state.games.map((item) => (
              <ListGroup.Item key={item.key} action href={`/play?id=${item.key}`}>{item.name}
                <span className="float-right"><ChevronRight /></span>
              </ListGroup.Item>
            ))}
            {this.noItems()}
          </ListGroup>
        </Card.Body>
      </Card>
      <ErrorMsg 
        showError={this.handleShowError()}
        closeError={this.handleCloseError.bind(this)}
        getError={this.getErrorMsg.bind(this)}
        />
      </>
    );
  }
}

export default GameList;