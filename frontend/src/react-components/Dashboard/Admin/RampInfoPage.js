import React from "react";
import Grid from '@material-ui/core/Grid';
import Navbar from "../../Navbar";
import RampDimensions from "./RampDimensions";
import StatusBlock from "./StatusBlock";
import Notes from "./Notes";
import GeneralInfo from "./GeneralInfo";
import "./admin_styles.css";
import ListingBox from "../../Listings";

/* Primary Component for the Admin Dashboard page */
class RampInfoPage extends React.Component {
  render () {
    const rampData = {
      l_height: 10,
      r_height: 10,
      color: "#EFDA33"
    };

    return (
      <Grid container>
        <Grid item xs={4}>
          <GeneralInfo isAdmin />
        </Grid>
        <Grid item container xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <RampDimensions ramp={ rampData } isAdmin />
            </Grid>
            <Grid item xs={6}>
              <StatusBlock isAdmin />
            </Grid>
          </Grid>
          <Notes />
        </Grid>
      </Grid>
    );
  }
}

export default RampInfoPage;
