import React from "react";

import "./styles.css";

/* Component for the Home page */
class Header extends React.Component {
  render() {

    return (
      <div className="header">
            <img style={{ display: 'block', margin: 'auto', maxWidth:'30%' } } src={"/static/logo.png"}></img>
      </div>
    );
  }
}

export default Header;
