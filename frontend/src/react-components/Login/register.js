import React from "react";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function RegisterForm(props) {
  return (
    <div className="buttons center">
      <form>
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


        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="repeatpassword"
          label="RepeatPassword"
          type="repeatpassword"
          id="repeatpassword"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            props.login({isAdmin: false});
          }} >
          { /* TODO: feed in actual new user data */ }
          Submit
        </Button>

        <Grid container>
          <Grid item xs>
            <Button fullWidth onClick={props.goBack}>
              Go Back
            </Button>
          </Grid>
        </Grid>

      </form>

    </div>
  );
}

export default RegisterForm;  