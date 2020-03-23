import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EditList from './components/EditList';
import Home from './components/Home';
import Game from './components/Game';
import AvailableGames from './components/AvailableGames';

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
 * https://freesound.org/ for my sounds (Currently not using a websounds are proving troublesome)
 * 
 * 
 * === Google Cloud Deploy ===
 * Copy build directory to read (this project) and edit (authenticated project) in the GAE project
 * 
 * == Manual ==
 * gcloud config set project what-word-is-that
 * gcloud app deploy #in the directory with the app.yaml
 * https://what-word-is-that.appspot.com/
 * gcloud app deploy index.yaml #I had trouble with indexes not deploying - maybe run this and wait. Hopefully auto-deploy working
 * 
 * == Automated ==
 * Now running through auto-build on commit to GitHub
 * https://cloud.google.com/source-repositories/docs/quickstart-triggering-builds-with-source-repositories
 * https://console.cloud.google.com/cloud-build/dashboard?project=what-word-is-that
 * 
 * 
 */

 /** TODO
 * - Create sets of lists to use for the game as test data and mocking gets that are not part of the build
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
              <NavDropdown.Item as={Link} to="/game-list">List of games</NavDropdown.Item>
              <NavDropdown.Item href="/edit/">Manage my lists</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <EditList list={workingList}/>
            </Route>
            <Route path="/play">
              <Game />
            </Route>
            <Route path="/game-list">
              <AvailableGames />
            </Route>           
            <Route path="/temp-play">
              <Game />
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