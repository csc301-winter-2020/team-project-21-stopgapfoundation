import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import "./styles.css";
import Header from "../Header";
import LoginForm from "../Login/login_form";


/* Component for the Home page */
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inLoginForm: false,
      isAdmin: false
    }
  }

  goBack = () => this.setState({ inLoginForm: false })


  render () {
    const mainComponent = !this.state.inLoginForm ? 
      <AccountTypeSelector clickHandler={ (isAdmin) =>  this.setState({inLoginForm: true, isAdmin: isAdmin}) }/> : 
      <LoginForm isAdmin={this.state.isAdmin} goBack = {this.goBack} />;

    return (
      <div className="home__bg-image center">
        <Header />
        {mainComponent}
      </div>
    );
  }
}

function AccountTypeSelector(props) {
  return (
    <div className="buttons center">
      <Button className="home__button" onClick={() => props.clickHandler(false) }>
        Client
      </Button>
      <Button className="home__button" onClick={() => props.clickHandler(true) }>
        Admin
      </Button>
    </div>
  );
}

export default Home;
