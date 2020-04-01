import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import ListingBox from '../Listings';
import Link from "react-router-dom/Link"

/* Primary Component for the Admin Dashboard page */
class ClientDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Welcome to StopGap!
        </h1>
        <Link to='/form'>
          <Button
            className="newRequestButton"
            color="primary" variant="contained" size='large'
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
            Create New Ramp Request
          </Button>
        </Link>
        <br />
        <br />
        <ListingBox click={(id) => this.props.gotoFuncs.ramp_info(false,id)} />
      </div>
    );
  }
}

export default ClientDashboard;
