import React from "react";
import Grid from '@material-ui/core/Grid'
import Navbar from "../../Navbar"
import RampDimensions from "./RampDimensions"
import ProgressBar from "../ProgressBar";
import "./admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class AdminDashboard extends React.Component {
  render () {
    return (
      <div>
        <Navbar title="Admin Dashboard" logout={this.props.logout}/>
        <div className={"content"}>
          <Grid container justify={"space-evenly"}>
            <Grid item xs={3}>
              <NumberStat title="Total Requests " stat={120} />
            </Grid>
            <Grid item xs={3}>
              <NumberStat title="Ready For Build" stat={60} />
            </Grid>
            <Grid item xs={3}>
              <NumberStat title="Ready For Paint" stat={12} />
            </Grid>
            <Grid item xs={3}>
              <NumberStat title="Ready For Delivery" stat={10} />
            </Grid>
          </Grid>

          <RampDimensions ramp={ {
            len: "30cm",
            width: "50cm",
            height: "10cm",
            depth: "40cm",
            grade: "22 deg",
            color: "#EFDA33"
          } } />

          <ProgressBar progress={1.0}/>
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
