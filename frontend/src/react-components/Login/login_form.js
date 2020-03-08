import React from "react";
import "./style.css";

import {
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

/**
 * Form for filling in login credentials.
 * 
 * @prop {function} login - use to login user. Takes new user object
 * @prop {function} goBack - use to return to parent login page.
 * @prop {boolean}  isAdmin - true iff the login form is for an admin
 */
function LoginForm(props) {
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
          onClick={(e) => {
            e.preventDefault();
            props.login({isAdmin: props.isAdmin})
          }}
        >
            Sign in
        </Button>

        <Grid container>
          <Grid item xs>
            <Button className="center_link" onClick={props.goBack} >
              Back to home page
            </Button>
          </Grid>
          { // We only allow clients to create new accounts. Stopgap accounts are made manually.
          !props.isAdmin && 
          <Grid item xs>
            <Link to={"./../register"}>
              <Button className="center_link">
                Don't have an account?<br/>Sign Up!
              </Button>
            </Link>
          </Grid>}
          
        </Grid>
      </form>
    </div>
      
  );
}

export default LoginForm;                                                                                                                                           