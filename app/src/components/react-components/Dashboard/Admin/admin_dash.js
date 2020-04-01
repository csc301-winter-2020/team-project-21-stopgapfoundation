import React from "react";
import "./admin_styles.css";
import Grid from '@material-ui/core/Grid';
import ListingBox from "../../Listings";

/* Primary Component for the Admin Dashboard page */
class AdminDashboard extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      total:0,
      build:0,
      paint:0,
      delivery:0,
      complete:0,
      orders: []
    }
  }
  /**
   * 
   */

  render () {
    const {orders, isLoaded, gotoFuncs} = this.props;
    const total = orders.length;
    var build_num = 0
    var paint_num = 0
    var delivery_num = 0
    var complete_num = 0
    if (isLoaded){
      for (var i = 0; i < total; i++) { // More efficient than built-in filter functions
        const phase = orders[i]["status"]
        if (phase == "Build Phase"){
          build_num ++;
        }
        if (phase == "Paint Phase"){
          paint_num ++;
        }
        if (phase == "Out for Delivery"){
          delivery_num ++;
        }
        if (phase ==  "Completed"){
          complete_num ++;
        }
      }
    }
  
    return (
      <div>
        <Grid container justify={"center"}>
          <Grid item xs >
            <NumberStat title="Total Requests" stat={total} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Ready For Build" stat={build_num} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Ready For Paint" stat={paint_num} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Out for Delivery" stat={delivery_num} />
          </Grid>+
          <Grid item xs >
            <NumberStat title="Completed Ramps" stat={complete_num} />
          </Grid>
        </Grid>

        <ListingBox click={(id) => gotoFuncs.ramp_info(true,id)} orders={orders} isAdmin isLoaded/>
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
