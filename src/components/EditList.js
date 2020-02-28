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
      list:this.state.list.concat({id:this.state.nextId, name:newText}),
      nextId:this.state.nextId+1
    });
  }

  render() {
    return (
      <div>
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
        <NewItem addNewItem={this.addItem.bind(this)} />
      </div>
    )    
  }
}

export default EditList;