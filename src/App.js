//import React, { useState } from 'react';
import React from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { XSquare } from 'react-bootstrap-icons';

import './App.css';

const workingList = [{id:'a', name:'Mickey Mouse'}, {id:'b', name:'Donald Duck'}, {id:'c', name:'Goofy'}];
/** TODO
 * 0. Get the focus back on the entry field when you enter data
 * 1. Make the form a component that validates itself and passes the value back to the list
 * 2. See if we can get some lines :-) in our sheet
 * 3. Method for pulling test data and real data into the application
 * 4. Updating the data
 */
/** 
const InputForm = () => {
  const [validated, setValidated] = React.useState(false);
  return (
    <Form className="mt-3" >
      <FormGroup>
        <Form.Control type="text" required placeholder="Enter new item" value={value} onChange={handleChange}></Form.Control>  
        <Form.Control.Feedback type="invalid">
            Please enter text before adding
        </Form.Control.Feedback>
      </FormGroup>
      <Button onClick={AddItem} >Add</Button>
  </Form>
  );
}
*/

const CurrentList = () => {
  const [nextId, setNextId] = React.useState(0);
  const [value, setValue] = React.useState('');
  const [list, setList] = React.useState(workingList);

  const deleteItem = id => {
    setList(list.filter(item => item.id !== id));
  };

  const AddItem = () => {
    setList(list.concat({id:nextId, name:value}));
    setNextId(nextId+1);
    setValue('');
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    setValue(value.replace(/\s/g, ""));
    if (value.replace(/\s/g, "")){
      setList(list.concat({id:nextId, name:value}));
      setNextId(nextId+1);
    }
    setValue('');    
    event.preventDefault();
  }

  return (
    <div>
    <ListGroup>
      {list.map(item => (
        <ListGroup.Item key={item.id}>{item.name}<span className="float-right"><Button onClick={() => deleteItem(item.id)} variant="link" size="sm"><XSquare /></Button></span>
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Form className="mt-3" onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control type="text" required placeholder="Enter new item" value={value} onChange={handleChange}></Form.Control>  
        <Form.Control.Feedback type="invalid">
            Please enter text before adding
        </Form.Control.Feedback>
      </FormGroup>
      <Button type="submit" >Add</Button> 
    </Form>
    </div>
  )
};

const App = () => (
  <Container>
      <h4>Guess words!</h4>
      <CurrentList list={workingList}/>
  </Container>
);

export default App;
