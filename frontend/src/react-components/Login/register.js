import React from "react";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class RegisterForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      pwd: "",
      pwdConfirm: "",
      passwordsMatch: true
    }
    this.form = React.createRef();
  }

  validateAndSubmit = e => {
    /* TODO: feed in actual new user data */
    e.preventDefault();
    if(!this.form.current.reportValidity())
      return;
    if (this.state.pwd != this.state.pwdConfirm){
      this.setState({passwordsMatch: false});
      return;
    }
    
    this.props.login({isAdmin: this.props.isAdmin})
    
  }

  render() {
    return (
      <div className="buttons center">
        <form ref={this.form} onSubmit={this.validateAndSubmit}>
          <TextField
            value = {this.state.email}
            onChange = { e => this.setState({
              email: e.target.value
            })}
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
            value = {this.state.pwd}
            onChange = { e => this.setState({
              pwd: e.target.value
            })}
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
            value = {this.state.pwdConfirm}
            onChange = { e => this.setState({
              pwdConfirm: e.target.value
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatpassword"
            label="RepeatPassword"
            type="password"
            id="repeatpassword"
            autoComplete="current-password"
            helperText={this.state.passwordsMatch ? "" : "Does not match password"}
            error={!this.state.passwordsMatch}
          />
  
          <Button
            type="submit"
            fullWidth
            variant="contained" >
            Submit
          </Button>
  
          <Grid container>
            <Grid item xs>
              <Button fullWidth onClick={this.props.goBack}>
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