import React from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom';
import "./style.css";
import Header from "../Header";
import LoginForm from "./login_form";


/* Component for the Login page */
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inLoginForm: false,
      isAdmin: false
    }
  }

  goBack = () => this.setState({ inLoginForm: false })

  render () {
    // if (this.props.loggedIn) // user already logged in. they must actually log OUT to stay logged in.
    //   return <Redirect to="/dashboard" />
    
    return (
      <div className="login__bg-image center">
        <Header />
        {!this.state.inLoginForm ? 
          <AccountTypeSelector clickHandler={ (isAdmin) =>  this.setState({inLoginForm: true, isAdmin: isAdmin}) }/> : 
          <LoginForm login={this.props.login} isAdmin={this.state.isAdmin} goBack = {this.goBack} />
        }
      </div>
    );
  }
}

/* Component to select a different kind of account */
function AccountTypeSelector(props) {
  return (
    <div className="buttons center">
      <Button className="login__button" onClick={() => props.clickHandler(false) }>
        Client
      </Button>
      <Button className="login__button" onClick={() => props.clickHandler(true) }>
        Admin
      </Button>
    </div>
  );
}

export default Login;
