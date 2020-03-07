import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Home from './react-components/Home';
import AdminDashboard from './react-components/AdminDashboard'

class App extends React.Component {

  loggedIn = false;

  render() {
      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              {/* TODO: Allow user to login as either admin or user. */}
              {/* TODO: redirect to seperate login page if user is not logged in. */}
              <Route exact path='/' render={() => (<Home />)}/>
              <Route exact path='/dashboard/admin' render={() => (<AdminDashboard />)}/> { /* TODO: create a dashboard component that will then have its own router for admin/user dashboards */ }
            </Switch>
            {/* {this.loggedIn ? <Redirect to="/dashboard/admin" /> : <Redirect to="/login" /> } */}
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
