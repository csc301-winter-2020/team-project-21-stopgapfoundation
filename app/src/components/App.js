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
      isAdmin: false, // TODO: properly store this
      isCurrentlyCheckingStorageForLogin: true,
      error: null,
      isLoaded: false,
      
    };
  }

  login = (user, pwd, isAdmin) => {
    console.log("StopGap: Logging in...");
    if (this.state.loggedIn){ //already logged in.
      console.error("Stopgap: user already logged in.");
      // Refreshes the page
      this.setState({
        loggedIn: false,
      });
      this.setState({
        loggedIn: true,
      });
      return;
    }
    // validate token
    fetch("/api/token/", {
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
          invalidLogin: true,
        });
      } else if ('access' in res && 'refresh' in res){
        localStorage.setItem('token-access', res.access);
        localStorage.setItem('token-refresh', res.refresh);
        localStorage.setItem('username', res.user);
        localStorage.setItem('is-admin', res.isAdmin);
        this.setState({
          loggedIn: true,
          isAdmin: isAdmin,
          invalidLogin: false,
        });
      }
    }, err => {
      this.setState({
        loggedIn: false,
        invalidLogin: true,
      });
      console.error(err);
    })
  }

  register = (username, password, first_name, last_name, isAdmin) => {
    console.log("StopGap: Registering new user...");

    // User already logged in.
    if (this.state.loggedIn){
      console.error("Stopgap: user already logged in.");
      // Refreshes the page
      this.setState({
        loggedIn: false
      });
      this.setState({
        loggedIn: true,
      });
      return;
    }

    // Register user using Django API
    fetch("/users/", {
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
      // Login user with newly created credentials
      this.login(username, password, isAdmin);
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      isAdmin: false,
      invalidLogin: false,
      username:""
    });
    localStorage.removeItem('token-access');
    localStorage.removeItem('token-refresh');
    localStorage.removeItem('username');
    localStorage.removeItem('is-admin');          
  }

  
  componentDidMount() {
    const accessToken = localStorage.hasOwnProperty("token-access") 
      ? localStorage.getItem("token-access") : "";
    const refreshToken = localStorage.hasOwnProperty("token-refresh") 
      ? localStorage.getItem("token-refresh") : "";
    // check if the existing access token is valid.
    // If not, attempt to retrieve a new one using the refresh token
    fetch("/api/token/verify/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        token: accessToken
      })
    })
    .then( res => {
      if (res.ok){
        console.log(`Access Token: ${accessToken}`)
        this.setState({
          loggedIn: true,
          isCurrentlyCheckingStorageForLogin: false
        });
        return;
      }

      // token is NOT valid, so attempt to refresh.
      fetch("/api/token/refresh/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          refresh: refreshToken
        })
      })
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
      }, error => { // REFRESH ERROR
        console.error(error)
        this.setState({
          loggedIn: false,
          isCurrentlyCheckingStorageForLogin: false
        })
      })
    }, error => { // VERIFY ERROR
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
                  ? <Dashboard loggedIn={this.state.loggedIn} logout={this.logout} />
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
