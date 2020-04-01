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
      total: 0,
      build:0,
      paint:0,
      delivery:0,
      complete:0
    }
  }


  componentDidMount() {
    fetch("http://localhost:8000/order-information/", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token-access')}`
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        const orders = result["results"];
        const total_num = result["count"]
        var build_num = 0
        var paint_num = 0
        var delivery_num = 0
        var complete_num = 0
        if(total_num > 0){
          var order
          for  (var i = 0; i < total_num; i++) {
            const phase = orders[i]["status"]
            if (phase == "Build Phase"){
              build_num += 1

            }
            if (phase == "Paint Phase"){
              paint_num += 1

            }
            if (phase ==  "Out for Delivery"){
              delivery_num += 1

            }
            if (phase ==  "Completed"){
              complete_num += 1

            }

          }

        
        }
        this.setState({
          isLoaded: true,
          total: total_num,
          build: build_num,
          paint:paint_num,
          delivery: delivery_num,
          complete:complete_num
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }


  render () {
  
    return (
      <div>
        <Grid container justify={"center"}>
          <Grid item xs >
            <NumberStat title="Total Requests" stat={this.state.total} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Ready For Build" stat={this.state.build} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Ready For Paint" stat={this.state.paint} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Out for Delivery" stat={this.state.delivery} />
          </Grid>
          <Grid item xs >
            <NumberStat title="Completed Ramps" stat={this.state.complete} />
          </Grid>
        </Grid>

        <ListingBox click={(id) => this.props.gotoFuncs.ramp_info(true,id)} isAdmin/>
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
