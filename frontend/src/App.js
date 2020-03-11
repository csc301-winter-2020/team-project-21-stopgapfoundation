import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './react-components/Login';
import Dashboard from './react-components/Dashboard';
import RequestForm from './react-components/RequestForm'
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      user: {
        isAdmin: true
      }
    };
  }

  login = (user) => {
    console.log("Stopgap: Logging in . . .");
    if (this.state.user.loggedIn){ //already logged in.
      console.error("Stopgap: user already logged in.");
      this.setState({
        loggedIn: false
      });
      this.setState({
        loggedIn: true
      });
      return;
    }
    const newUser = { ... this.state.user}
    Object.assign(newUser, user);
    this.setState({
      loggedIn: true,
      user: newUser
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      user: {
        isAdmin: false
      }
    })
  }

  render() { 
      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route path='/login' render={() => (<Login loggedIn={this.state.loggedIn} login={this.login} user={this.state.user} />) } />
              <Route path='/dashboard' render={() => (<Dashboard loggedIn={this.state.loggedIn} user={this.state.user} logout={this.logout} />) } />
              <Route exact path='/form' render={() => (<RequestForm />)}/>
              <Redirect path='/' to={this.state.loggedIn ? "/dashboard" : "/login" } />
            </Switch>
            
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
