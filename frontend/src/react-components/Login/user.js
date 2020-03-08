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
import Register from "../Register/register";
import UserItems from "../Profile/user";

function ClientLogin(props) {
  return (
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
          {/* <Link to={"./../userprofile"}> */}
            Sign in
          {/* </Link> */}

        </Button>

        <Grid container>
          <Grid item xs>
            <Button onClick={props.goBack} >
              Back to home page
            </Button>
          </Grid>
          <Grid item>
            <Link className="register_link" to={"./../register"}>
              Don't have an account? Sign Up!
            </Link>
          </Grid>
        </Grid>
      </form>
      {/* <div className="home__bg-image center">
       
         <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/userprofile">
            <UserItems />
          </Route>
        </Switch> 
      </div> */}
    </div>
      
  );
}

export default ClientLogin;                                                                                                                                           