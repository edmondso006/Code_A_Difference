import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import NavBar from './components/layout/navbar';
import Dashboard from './components/dashboard/dashboard';
import ProjectDetails from './components/projects/projectDetails';
import SignIn from './components/auth/signIn';
import SignUp from './components/auth/signUp';
import CreateProject from './components/projects/createProject';
import Profile from './components/auth/profile';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <NavBar />

          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDetails} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create" component={CreateProject} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
