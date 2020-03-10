import React from "react";
import logo from "../../../img/logo.png"

import "./styles.css";

/* Component for the Home page */
class Header extends React.Component {
  render() {

    return (
      <div className="header">
        <img style={{display:'block', margin:'auto'}} src={logo}></img>
      </div>
    );
  }
}

export default Header;
