import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EditList from './components/EditList';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

/**
 * 
 * ==== Rebuilding this app from scratch ====
 * npm install react-bootstrap bootstrap
 * npm install react-bootstrap-icons --save
 * npm install react-router-dom
 * 
 * 
 * === Heavily relied upon references
 * https://react-bootstrap.github.io/getting-started/introduction
 * https://www.robinwieruch.de/react-list-component
 * https://icons.getbootstrap.com/
 * https://reacttraining.com/react-router/web/guides/quick-start
 * 
 * 
 */

 /** TODO
 * - Only focus when editing lists AND adding new (not on delete)
 * - Create sets of lists to use for the game 
 * - Create game probabaly as modal full screen???????
 * - Method for pulling test data and real data into the application
 * - Updating the data
 */

const workingList = [{id:'a', name:'Mickey Mouse'}, {id:'b', name:'Donald Duck'}, {id:'c', name:'Goofy'}];

class App extends React.Component{
  render() {
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Guess words!</Navbar.Brand>
            <NavDropdown title="Options" id="basic-nav-dropdown" className="nav-item dropdown ml-auto">
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/edit-list">Edit list</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/edit-list">
              <EditList list={workingList}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;