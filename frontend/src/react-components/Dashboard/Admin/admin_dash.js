import React from "react";
import Grid from '@material-ui/core/Grid';
import Navbar from "../../Navbar";
import RampDimensions from "./RampDimensions";
import StatusBlock from "./StatusBlock";
import Notes from "./Notes";
import GeneralInfo from "./GeneralInfo";
import "./admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class AdminDashboard extends React.Component {
  render () {
    const rampData = {
      l_height: 10,
      r_height: 10,
      color: "#EFDA33"
    };

    return (
      <div>
        <Navbar title="Admin Dashboard" logout={this.props.logout}/>
        <div className={"content"}>
          <Grid container justify={"space-evenly"}>
            <Grid item xs={2}>
              <NumberStat title="Total Requests " stat={120} />
            </Grid>
            <Grid item xs={2}>
              <NumberStat title="Ready For Build" stat={60} />
            </Grid>
            <Grid item xs={2}>
              <NumberStat title="Ready For Paint" stat={12} />
            </Grid>
            <Grid item xs={2}>
              <NumberStat title="Ready For Delivery" stat={10} />
            </Grid>
          </Grid>

          <hr />

          <Grid container>
            <Grid item xs={4}>
              <GeneralInfo isAdmin />
            </Grid>
            <Grid item xs={4}>
              <RampDimensions ramp={ rampData } isAdmin />
            </Grid>
            <Grid item xs={4}>
              <StatusBlock isAdmin />
            </Grid>
          </Grid>

          <Notes />

          

          

        </div>
      </div>
    );
  }
}

function NumberStat(props){
  return (
    <div className={"number-stat block"}>
      <h2 className={"block-title"}>{props.title}</h2>
      <span className={"number-stat-num"}>
        {props.stat}
      </span>
    </div>
  );
}

export default AdminDashboard;
