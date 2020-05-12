import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GamesListPublicPage from './pages/GamesListPublicPage';
import GamesListMyPage from './pages/GamesListMyPage';
import {Person, PersonFill} from 'react-bootstrap-icons';
import UserService from './services/UserService';
import {isTest} from './components/utils';

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
 * npm install react-bootstrap-range-slider
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

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      auth:false,
      user:"login",
      errorMsg:""
    }
    this.userService = new UserService();
  }  

  retrievedUser(rUser) {
    //Only update user if the fetch returns something diffenerent than the default user
    if (rUser !== this.state.user){this.setState({auth:true,user:rUser})}
  }

  componentDidMount(){
    this.userService.getUser({defaultUser:this.state.user, gotUser:this.retrievedUser.bind(this)});
  }

  loginDisplay(){
    if (this.state.auth){
      return (<>
        <NavDropdown.Item as={Link} to="/my-game-list">My games</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/edit/">Manage my games</NavDropdown.Item>
        <NavDropdown.Item><PersonFill /> {this.state.user}</NavDropdown.Item>
        </>);
    } else if (!isTest()) {
      return (<>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/edit/logged-in"><Person /> {this.state.user}</NavDropdown.Item>
        </>);
    }
  }

  render() {
    console.log("Version 1.8");
    return (
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <NavDropdown title="Menu" id="basic-nav-dropdown" className="dropdown mr-auto">
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/public-game-list">Public games</NavDropdown.Item>
              {this.loginDisplay()}
            </NavDropdown>
            <Navbar.Brand as={Link} to="/">WWiT</Navbar.Brand>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/play/:id">
              <GamePage />
            </Route>
            <Route path="/public-game-list">
              <GamesListPublicPage api="search" title="Public games" function="play" search={true} />
            </Route>
            <Route path="/my-game-list">
              <GamesListMyPage api="my-lists" function="play" title="My games" />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;