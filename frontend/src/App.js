import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './react-components/Home';
class App extends React.Component {
  render() {
      return (
        <div> 
          <BrowserRouter>
            <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
              { /* Each Route below shows a different component depending on the exact path in the URL  */ }
              <Route exact path='/' render={() => (<Home />)}/>
          </Switch>
          </BrowserRouter>
        </div>
      )
  }
}


export default App;