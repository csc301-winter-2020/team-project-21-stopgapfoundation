import React from "react";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.form = React.createRef();
  }

  validate = () => {
    return this.form.current.reportValidity();
  }

  render() {
    const props = this.props;
    return (
      <div className="buttons center">
        <form ref={this.form} onSubmit={e => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
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
            type="password"
            id="repeatpassword"
            autoComplete="current-password"
          />
  
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              if (this.validate())
                props.login({isAdmin: props.isAdmin})
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
}

export default RegisterForm;  