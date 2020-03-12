import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Navbar from "../Navbar/index"
/* Primary Component for the Admin Dashboard page */
class ClientDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to StopGap!</h1>
            <Button onClick={onClickRequestForm} className="newRequestButton"
              color="primary" variant="contained" size='large'
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
              Create New Ramp Request
            </Button>
      </div>
    );
  }
}

const onClickRequestForm = (e) => {
      e.preventDefault();

  } 

export default ClientDashboard;