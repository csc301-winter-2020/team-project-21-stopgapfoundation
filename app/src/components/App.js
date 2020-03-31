import React from 'react';
import { render } from "react-dom";
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Login from './react-components/Login';
import Dashboard from './react-components/Dashboard';
import UserForm from './react-components/RequestForm';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false, // by default, no one is logged in
      invalidLogin: false,
      user: {
        isAdmin: true
      },
      flag: false
    };
  }

  login = (user, pwd) => {
    console.log("Stopgap: Logging in . . .");
    if (this.state.user.loggedIn){ //already logged in.
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

  logout = () => {
    this.setState({
      loggedIn: false,
      user: {
        isAdmin: true
      }
    });
    localStorage.removeItem('token-access');
    localStorage.removeItem('token-refresh');
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty("token-access") &&  localStorage.hasOwnProperty("token-refresh")) {
      // check if the existing token is valid.
      fetch("http://localhost:8000/api/token/refresh/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          refresh: localStorage.getItem("token-refresh")
        })
      })
      .then(res => res.json())
      .then(res => {
          if ('access' in res){
            localStorage.setItem("token-access", res.access)
            this.setState({
              loggedIn: true
            })
          } else {
            this.setState({
              loggedIn: false
            })
          }
      }, error => {
        console.error(error)
        this.setState({
          loggedIn: false
        })
      })
    }
  }

  render() { 
      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route path='/login' render={() => (<Login loggedIn={this.state.loggedIn} login={this.login} user={this.state.user} invalidLogin={this.state.invalidLogin} />) } />
              <Route path='/dashboard' render={() => (
                this.state.loggedIn 
                  ? <Dashboard loggedIn={this.state.loggedIn} user={this.state.user} logout={this.logout} />
                  : <Redirect to='/login' />
              )} />
              <Route exact path='/form' render={() => (<UserForm />)}/>
              <Redirect path='/' to={this.state.loggedIn ? "/dashboard" : "/login" } />
            </Switch>
            
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
const container = document.getElementById("root");
render(<App />, container);
