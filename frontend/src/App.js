import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Home from './react-components/Home';
import Dashboard from './react-components/Dashboard';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        loggedIn: false,
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
              <Route exact path='/' render={() => (<Home />)}/>
              <Route exact path='/dashboard' render={() => (<Dashboard user={this.state.user} />)}/> { /* TODO: create a dashboard component that will then have its own router for admin/user dashboards */ }
            </Switch>
            {/* {this.loggedIn ? <Redirect to="/dashboard/admin" /> : <Redirect to="/login" /> } */}
          </BrowserRouter>
        </div>
      )
  }
}


export default App;
