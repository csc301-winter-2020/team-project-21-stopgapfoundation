import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { render } from "react-dom";
import Home from './Home';

class App extends Component {

  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */}
            { /* Each Route below shows a different component depending on the exact path in the URL  */}
            <Route exact path='/' render={() => (<Home />)} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  // render () {
  //   return (
  //     <div>
  //       <h1>Hello Worlds</h1>

  //     </div>
  //   );
  // }



}


export default App;
const container = document.getElementById("app");
render(<App />, container);
