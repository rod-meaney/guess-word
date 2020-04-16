import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';
import ListService from '../services/ListService'
import SearchBox from './SearchBox'

class GameListNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      api:this.props.api,
      searchString:"",
      serverSearchResults:[],
      gamesList:[],
      searching:false
    }
    this.listService = new ListService();
  }

  didGetData(data){this.setState({gamesList:data, serverSearchResults:data, searching:false});}
  componentDidMount(){
    this.setState({searching:true});
    this.listService.searchList({api:this.state.api, searchString:this.state.searchString, results:this.didGetData.bind(this)})
  }

  renderData(){
    if (this.state.searching) return <div><br /><center><span>Loading</span> <Spinner style={{verticalAlign:"middle"}} animation="grow"/></center></div>
    if (this.state.gamesList.length===0){
      return <ListGroup><ListGroup.Item>No items found</ListGroup.Item></ListGroup>;
    }
    return (
      <ListGroup>
        {this.state.gamesList.map((item) => (
          <ListGroup.Item key={item.key} action href={`/play?id=${item.key}`}>{item.name}
            <span className="float-right"><ChevronRight /></span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
 
  handleSeachTextUpdate(text) {
    console.log(text);
    this.setState({searchString:text});
  }

  render() {
    return (
      <Card>
        <Card.Body>
        <Card.Title>{this.props.title}</Card.Title>
          {this.props.search ? <SearchBox updateSearchText={this.handleSeachTextUpdate.bind(this)} /> : ""}
          {this.renderData()}
        </Card.Body>
      </Card>
    );
  }
}

export default GameListNew;