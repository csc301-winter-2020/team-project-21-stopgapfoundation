import React from "react";
import Grid from '@material-ui/core/Grid'
import "./admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class AdminDashboard extends React.Component {
  render () {
    return (
      <div>
        <div id="navbar">
          navbar {/*TODO: replace with actual navbar component */}
        </div>
        <div className={"content"}>
          <Grid container>
            <NumberStat item title="Total Requests" stat={120} />
            <NumberStat item title="Ready For Build" stat={60} />
            <NumberStat item title="Ready For Paint" stat={12} />
            <NumberStat item title="Ready For Delivery" stat={10} />
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
