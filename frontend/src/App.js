import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Home from './react-components/Home';
import Dashboard from './react-components/Dashboard';
import UserForm from './react-components/RequestForm/UserForm'
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        loggedIn: true,
        isAdmin: false
      }
    };
  }

  render() {

      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/login' render={() => (<Home />)}/>
              <Route exact path='/form' render={() => (<UserForm />)}/>
              <Route exact path='/dashboard' render={() => (<Dashboard user={this.state.user} />)}/> { /* TODO: create a dashboard component that will then have its own router for admin/user dashboards */ }
            </Switch>
            {this.state.user.loggedIn ? <Redirect to="/form" /> : <Redirect to="/login" /> }
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
