import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';
import ListService from '../../services/ListService'
import SearchBox from './SearchBox'

class GameList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      api:this.props.api,
      searchString:"",
      searchLengthPrev:0,
      serverFetchedGames:[],
      gamesList:[],
      searching:false
    }
    this.listService = new ListService();
  }

  didGetData(data){this.setState({gamesList:data, serverFetchedGames:data, searching:false});}
  
  componentDidMount(){
    this.setState({searching:true});
    this.listService.searchList({api:this.state.api, searchString:this.state.searchString, results:this.didGetData.bind(this)})
  }

  renderData(){
    if (this.state.searching) return <div><br /><center><span>Loading</span> <Spinner style={{verticalAlign:"middle"}} animation="grow"/></center></div>
    if (this.state.gamesList.length===0){return <ListGroup><ListGroup.Item>No items found</ListGroup.Item></ListGroup>;}
    let listFunction = this.props.function; //depending on where it comes from you may be editing the list or playing the game
    return (
      <ListGroup>
        {this.state.gamesList.map((item) => (
          <ListGroup.Item key={item.key} action href={`/${listFunction}?id=${item.key}`}>{item.name}
            <span className="float-right"><ChevronRight /></span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
 
  search(){
    //We only do a server search if it is exactly 3 charcters (its the only index on the data)
    //Once we have returned 3 characters we 
    if (this.state.searchString.length===0) {
      //search server when it returns to 0
      this.listService.searchList({api:this.state.api, searchString:this.state.searchString, results:this.didGetData.bind(this)});
    } else if (this.state.searchString.length===3 && this.state.searchLengthPrev===2) {
      //Search server when they go from 2-3 chars
      this.listService.searchList({api:this.state.api, searchString:this.state.searchString, results:this.didGetData.bind(this)})
    } else if (this.state.searchString.length===3) {
      //Return it to the original server search as we have reached 3 from 4 characters
      this.setState({gamesList:this.state.serverFetchedGames});
    } else if (this.state.searchString.length>3) {
      //Search the array fetched from the server if greater than 3 or 3 and deleting characters
      let that = this;
      let new_games = this.state.serverFetchedGames.filter(function(el){
        return (el.name.toLowerCase().indexOf(that.state.searchString.toLowerCase())>-1)
      })
      this.setState({gamesList:new_games});
    }
  }

  handleSeachTextUpdate(text) {  
    this.setState({searchString:text, searchLengthPrev:this.state.searchString.length});
    setTimeout(() => this.search(),200);
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

export default GameList;