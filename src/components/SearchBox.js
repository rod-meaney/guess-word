import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SearchBox = ({updateSearchText}) => {
  const handleSubmit = event => {event.preventDefault();}
  const updateSearch = (event) => {updateSearchText(event.target.value)}
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Group controlId="formSearch">
            <Form.Control 
              placeholder="Search" 
              type="text"
              onChange={updateSearch}
            />
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}
export default SearchBox;