import React from "react";
import Grid from '@material-ui/core/Grid'
import Navbar from "../../Navbar"
import "./admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class AdminDashboard extends React.Component {
  render () {
    return (
      <div>
        <Navbar title="Admin Dashboard"/>
        <div className={"content"}>
          <Grid container>
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
        </div>

      </div>
    );
  }
}

function NumberStat(props){
  return (
    <div className={"number-stat"}>
      <h2 className={"number-stat-title"}>{props.title}</h2>
      <span className={"number-stat-num"}>
        {props.stat}
      </span>
    </div>
  );
}

export default AdminDashboard;
