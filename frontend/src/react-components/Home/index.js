import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";
import Header from "../Header";

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div className="home__bg-image center">
          <Header />
        <div className="buttons center">
        <Link className ="home__button-link" to={"./../user"}>
          <Button className="home__button">User</Button>
        </Link> 
        <Link className ="home__button-link" to={"./../button"}>
          <Button className="home__button">Admin</Button>
        </Link> 
        </div>
      </div>
    );
  }
}

export default Home;
