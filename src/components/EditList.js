import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { XSquare } from 'react-bootstrap-icons';
import NewItem from './NewItem';

class EditList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nextId:0,
      list: props.list,
    }
  }

  deleteItem(id) {
    this.setState({list:this.state.list.filter(item => item.id !== id)});
  };

  addItem(newText){
    this.setState({
      //list:this.state.list.concat({name:newText, id:this.state.nextId}),
      list:[{name:newText, id:this.state.nextId}].concat(this.state.list),
      nextId:this.state.nextId+1
    });
  }

  render() {
    return (
      <div>
        <NewItem addNewItem={this.addItem.bind(this)} />
        <ListGroup>
          {this.state.list.map(item => (
            <ListGroup.Item key={item.id}>
              {item.name}
              <span className="float-right">
                <XSquare onClick={() => this.deleteItem(item.id)} />
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )    
  }
}

export default EditList;