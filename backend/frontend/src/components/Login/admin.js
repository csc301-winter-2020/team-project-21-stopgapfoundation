import React from "react";
import "./style.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Home from "../Home";
import Header from "../Header";

class Admin extends React.Component {
  render () {
    return (
      <Router>
        <div className="home__bg-image center">
          <Header />
          <div className="buttons center">
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

              <Grid container>
                <Grid item xs>
                  <Link className="homepage_link" to={"./../home"}>
                    Back to home page
                  </Link>
                </Grid>

              </Grid>



            </form>
          </div>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>

        </div>
      </Router>
    )

  }

}


export default Admin;                                                                                                                                           