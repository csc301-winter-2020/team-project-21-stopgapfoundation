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
import User from "../Login/user";
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

  render () {
    let mainComponent = null;
    if (!this.state.isLoggingIn){
      mainComponent = <LoginButtons clickHandler={(isAdmin) => {
        this.setState({
          isLoggingIn: true,
          isAdmin
        });
      }} />
    } else {
      mainComponent = this.state.isAdmin ? <Admin /> : <User />
    }

    return (
      <Router>
        <div className="home__bg-image center">
          <Header />
          {mainComponent}
        </div>
      </Router >
    );
  }
}

function LoginButtons(props) {
  const onClickAdmin = (e) => {
    e.preventDefault();
    props.clickHandler(false);
  }

  const onClickClient = (e) => {
    e.preventDefault();
    props.clickHandler(true);
  }

  return (
    <div className="buttons center">
      <Button className="home__button" onClick={onClickClient}>
        Client
      </Button>
      <Button className="home__button" onClick={onClickAdmin}>
        Admin
      </Button>
    </div>
  );
}

export default Home;
