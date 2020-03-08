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
import ClientLogin from "../Login/user";
import Admin from "../Login/admin";


/* Component for the Home page */
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggingIn: false,
      isAdmin: false
    }
  }

  goBack = () => this.setState({ isLoggingIn: false })

  render () {
    let mainComponent = null;
    if (!this.state.isLoggingIn){
      mainComponent = <LoginButtons clickHandler={ (isAdmin) =>  this.setState({isLoggingIn: true, isAdmin: isAdmin}) }/>
    } else {
      mainComponent = this.state.isAdmin ? <Admin  goBack = {this.goBack} />  : <ClientLogin goBack = {this.goBack} />
    }

    return (
      <div className="home__bg-image center">
        <Header />
        {mainComponent}
      </div>
    );
  }
}

function LoginButtons(props) {
  console.log("test");

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
