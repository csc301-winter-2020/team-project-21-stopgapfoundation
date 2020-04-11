import React from "react";

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';

/**
 * Form for filling in login credentials.
 * 
 * @prop {function} login - use to login user. Takes new user object
 * @prop {function} goBack - use to return to parent login page.
 * @prop {boolean}  isAdmin - true iff the login form is for an admin
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.form = React.createRef();
  }

  validateAndSubmit = e => {
    e.preventDefault();
    if(this.form.current.reportValidity()){
      this.props.login(this.state.username, this.state.password, this.props.isAdmin)
    }
  }
  
  render() {
    return (
      <div className="buttons center">
        <form ref={this.form} onSubmit={this.validateAndSubmit}>
          <TextField
            value={this.state.username}
            onChange = { e => this.setState({
              username: e.target.value
            })}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="text"
          />
  
          <TextField
            value = {this.state.pwd}
            onChange = { e => this.setState({
              password: e.target.value
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
  
          {this.props.invalidLogin && (<Alert severity="error">{this.props.loginMsg}</Alert>) }

          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
              Sign in
          </Button>

  
          <Grid container>
            <Grid item xs>
              <Button className="center_link" onClick={this.props.goBack} >
                Back to home page
              </Button>
            </Grid>
            { // We only allow clients to create new accounts. Stopgap accounts are made manually.
            !this.props.isAdmin && 
            <Grid item xs>
              <Button className="center_link" onClick={this.props.register}>
                Don't have an account?<br/>Sign Up!
              </Button>
            </Grid>}
            
          </Grid>
        </form>
      </div>
    );
  }
}

export default LoginForm;                                                                                                                                           