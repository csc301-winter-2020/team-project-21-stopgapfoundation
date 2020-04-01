import React from 'react';
import { render } from "react-dom";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './react-components/Login';
import Dashboard from './react-components/Dashboard';
import UserForm from './react-components/RequestForm';
import { LinearProgress } from '@material-ui/core';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false, // by default, no one is logged in
      invalidLogin: false,
      isAdmin: true, // TODO: properly store this
      isCurrentlyCheckingStorageForLogin: true
    };
  }

  login = (user, pwd, isAdmin) => {
    console.log("StopGap: Logging in...");
    if (this.state.loggedIn){ //already logged in.
      console.error("Stopgap: user already logged in.");
      // Refreshes the page
      this.setState({
        loggedIn: false
      });
      this.setState({
        loggedIn: true
      });
      return;
    }
    // validate token
    fetch("http://localhost:8000/api/token/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "username": user,
        "password": pwd
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      if ('detail' in res){
        localStorage.removeItem('token-access')
        localStorage.removeItem('token-refresh')
        this.setState({
          loggedIn: false,
          invalidLogin: true
        });
      } else if ('access' in res && 'refresh' in res){
        localStorage.setItem('token-access', res.access);
        localStorage.setItem('token-refresh', res.refresh);
        this.setState({
          loggedIn: true,
          isAdmin: isAdmin,
          invalidLogin: false
        });
      }
    }, err => {
      this.setState({
        loggedIn: false,
        invalidLogin: true
      });
      console.error(err);
    })
  }

  register = (username, password, first_name, last_name, isAdmin) => {
    console.log("StopGap: Registering new user...");
    console.log(username, password, first_name, last_name, isAdmin)

    // User already logged in.
    if (this.state.loggedIn){
      console.error("Stopgap: user already logged in.");
      // Refreshes the page
      this.setState({
        loggedIn: false
      });
      this.setState({
        loggedIn: true
      });
      return;
    }

    // Register user using Django API
    fetch("http://localhost:8000/users/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "email": username,
        "first_name": first_name,
        "last_name": last_name,
        "is_staff": isAdmin
      })
    }).then(res => {
      console.log(res);

      // Login user with newly created credentials
      this.login(username, password, isAdmin);
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      isAdmin: false,
      invalidLogin: false
    });
    localStorage.removeItem('token-access');
    localStorage.removeItem('token-refresh');
  }

  
  componentDidMount() {
    const refreshToken = localStorage.hasOwnProperty("token-access") &&  localStorage.hasOwnProperty("token-refresh") 
      ? localStorage.getItem("token-refresh")
      : "";
    // check if the existing token is valid.
    fetch("http://localhost:8000/api/token/refresh/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    })
    .then(res => res.json())
    .then(res => {
        if ('access' in res){
          localStorage.setItem("token-access", res.access)
          this.setState({
            loggedIn: true,
            isCurrentlyCheckingStorageForLogin: false
          })
        } else {
          this.setState({
            loggedIn: false,
            isCurrentlyCheckingStorageForLogin: false
          })
        }
    }, error => {
      console.error(error)
      this.setState({
        loggedIn: false,
        isCurrentlyCheckingStorageForLogin: false
      })
    });
  }

  render() { 
      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route
                path='/login'
                render={() => (
                  <Login loggedIn={this.state.loggedIn}
                  login={this.login}
                  register={this.register}
                  isAdmin={this.state.isAdmin}
                  invalidLogin={this.state.invalidLogin} />
                )}
              />
              <Route path='/dashboard' render={() => (
                this.state.loggedIn 
                  ? <Dashboard loggedIn={this.state.loggedIn} isAdmin={this.state.isAdmin} logout={this.logout} />
                  : <Redirect to='/login' />
              )} />
              <Route exact path='/form' render={() => (<UserForm />)}/>
              <Route path='/' render={() => (
                this.state.isCurrentlyCheckingStorageForLogin 
                  ? (<div>
                      <h1>Loading . . .</h1>
                      <LinearProgress />
                    </div>)
                  : <Redirect path='/' to={this.state.loggedIn ? "/dashboard" : "/login" } />
              )} />
            </Switch>
            
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
const container = document.getElementById("root");
render(<App />, container);
