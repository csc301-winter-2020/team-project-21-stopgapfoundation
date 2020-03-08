import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './react-components/Login';
import Dashboard from './react-components/Dashboard';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      user: {
        isAdmin: false 
      }
    };
  }

  login = (user) => {
    const newUser = { ... this.state.user}
    Object.assign(newUser, user);
    this.setState({
      loggedIn: true,
      user: newUser
    });
  }

  render() { 
      return (
        <div> 
          <BrowserRouter>
            {this.state.loggedIn ? 
              <Redirect to="/dashboard" /> : 
              <Redirect to="/login" /> }
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/login' render={() => (<Login loggedIn={this.state.loggedIn} login={this.login} user={this.state.user} />)}/>
              <Route exact path='/dashboard' render={() => (<Dashboard user={this.state.user} />)}/> { /* TODO: create a dashboard component that will then have its own router for admin/user dashboards */ }
            </Switch>
            
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
