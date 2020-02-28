import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';

class NewItem extends React.Component {
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: ''
    }
  }

  handleChange (event) {
    this.setState({value:event.target.value});
  };

  handleSubmit(event) {
    this.setState({value:this.state.value.replace(/\s/g, "")});
    if (this.state.value.replace(/\s/g, "")){
      this.props.addNewItem(this.state.value);
    }
    this.setState({value:""});
    event.preventDefault();
  }  

  componentDidUpdate() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <Form className="mt-3" onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <Form.Control 
            type="text" 
            required placeholder="Enter new item" 
            value={this.state.value} 
            onChange={this.handleChange.bind(this)}
            ref={this.inputRef}
          >
          </Form.Control>  
          <Form.Control.Feedback type="invalid">
              Please enter text before adding
          </Form.Control.Feedback>
        </FormGroup>
        <Button type="submit" >Add</Button> 
      </Form>
    )    
  }
}
export default NewItem;
