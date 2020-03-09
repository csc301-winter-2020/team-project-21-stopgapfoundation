import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import "./styles.css";
import Header from "../Header";
import User from "../Login/user";
import Admin from "../Login/admin";


/* Component for the Home page */
class Home extends React.Component {
  render () {
    return (
      <Router>
        <div className="home__bg-image center">
          <Header />
          <div className="buttons center">
            <Link className="home__button-link" to={"./../user"}>
              <Button className="home__button" >User</Button>
            </Link>
            <Link className="home__button-link" to={"./../admin"}>
              <Button className="home__button">Admin</Button>
            </Link>
          </div>

          <Switch>
            < Route path="/user">
              <User />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            {/* <Route path="/home">
              <Home />
            </Route> */}
          </Switch>
        </div>
      </Router >
    );
  }
}









export default Home;
