import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect, Link } from 'react-router-dom';
import "./style.css";
import Header from "./Header";
import LoginForm from "./login_form";
import RegisterForm from "./register";


/* Component for the Login page */
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inLoginForm: false,
      inRegisterForm: false,
      isAdmin: false
    }
  }

  render () {
    if (this.props.loggedIn) // user already logged in. they must actually log OUT to stay logged in.
      return <Redirect to="/dashboard" />
    
    return (
      <div className="login__bg-image center">
        <Header />
        {!this.state.inLoginForm ? 
          <AccountTypeSelector clickHandler={ (isAdmin) =>  this.setState({inLoginForm: true, isAdmin: isAdmin}) }/> : 
          (
            this.state.inRegisterForm ? 
              <RegisterForm register={this.props.register} goBack = {() => this.setState({ inRegisterForm: false })}/> :
              <LoginForm 
                username = {this.props.username}
                login={this.props.login} 
                register={() => this.setState({inRegisterForm: true })} 
                isAdmin={this.state.isAdmin} 
                goBack = {() => {
                  this.setState({ inLoginForm: false });
                  this.props.logout();
                }}
                invalidLogin={this.state.inLoginForm && this.props.invalidLogin} 
                loginMsg={this.state.inLoginForm ? this.props.loginMsg : ""} 
              />
          )
        }
      </div>
    );
  }
}

/* Component to select a different kind of account */
function AccountTypeSelector(props) {
  return (
    <div className="buttons center">
        <Button
           className="block newRequestButton login__button"
          onClick={() => props.clickHandler(false)}
           variant="contained" size='large'
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
          Create New Ramp Request
          <br/>
          Or
          <br/>
          Check Status of Existing Ramp Request
        </Button>
        <Button className="block login__button" onClick={() => props.clickHandler(true) }>
          Admin
          <br/>
          (StopGap Staff Only)
        </Button>
    </div>
  );
}

export default Login;
