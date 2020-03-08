import React from "react";
import Button from "@material-ui/core/Button";
import "./style.css";
import Header from "../Header";
import LoginForm from "./login_form";


/* Component for the Home page */
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
    return (
      <div className="login__bg-image center">
        <Header />
        {!this.state.inLoginForm ? 
          <AccountTypeSelector clickHandler={ (isAdmin) =>  this.setState({inLoginForm: true, isAdmin: isAdmin}) }/> : 
          <LoginForm isAdmin={this.state.isAdmin} goBack = {this.goBack} />
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
