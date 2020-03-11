import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Navbar from "../Navbar/index"
import Link from "react-router-dom/Link"

/* Primary Component for the Admin Dashboard page */
class ClientDashboard extends React.Component {
  render() {
    return (
      <div>
        <Navbar title="Client Dashboard" logout={this.props.logout}/>
        <h1 style={{ textAlign: 'center' }}>Welcome to StopGap!</h1>
          <Link to='/form'>
            <Button
              className="newRequestButton"
              color="primary" variant="contained" size='large'
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
              Create New Ramp Request
            </Button>
          </Link>
      </div>
    );
  }
}

export default ClientDashboard;


/*

            

*/