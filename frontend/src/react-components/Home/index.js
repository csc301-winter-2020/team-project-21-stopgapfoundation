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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

/* Component for the Home page */
class Home extends React.Component {
  render () {
    return (
      <Router>
        <div className="home__bg-image center">
          <Header />
          <div className="buttons center">
            <Link className="home__button-link" to={"./../user"}>
              <Button className="home__button">User</Button>
            </Link>
            <Link className="home__button-link" to={"./../admin"}>
              <Button className="home__button">Admin</Button>
            </Link>
          </div>

          <Switch>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="./../">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}




function User () {
  const element = (<div className="userform">
    <form  >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
      >
        Sign In
    </Button>
      <Router>
        <Grid container>
          <Grid item xs>
            <Link className="homepage_link" to={"./../"}>
              Back to home page
          </Link>
          </Grid>
          <Grid item>
            <Link className="register_link" to={"./../register"}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="./../">
            <Home />
          </Route>
        </Switch>

      </Router>
    </form>
  </div>
  );
  return ReactDOM.render(element, document.getElementsByClassName("buttons center")[0]);
}

function Admin () {
  const element = (<div className="adminform">
    <form >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
      >
        Sign In
      </Button>
      <Router>
        <Grid container>
          <Grid item xs>
            <Link className="homepage_link" to={"./../"}>
              Back to home page
          </Link>
          </Grid>
        </Grid>
      </Router>
    </form>
  </div>
  );
  return ReactDOM.render(element, document.getElementsByClassName("buttons center")[0]);
}







export default Home;
