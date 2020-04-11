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
      orders: []
    }
  }
  

  componentWillMount() {
    console.log('wow')
    console.log(typeof this.props.verifyTokens())
    this.props.verifyTokens().then(valid => {
      console.log(valid);
      if (!valid)
        return;
      fetch("/order-information/", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token-access')}`
        }
      })
      .then(res => {
        if (res.ok)
          return res.json()
        throw new Error(`Something went wrong with error code ${res.status}`)
      })
      .then(
        (result) => {
          const orders = result["results"];
  
          this.setState({
            isLoaded: true,
            orders: orders
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
      );
    });
  }
  

  render () {

    const {gotoFuncs} = this.props;
    const {orders, isLoaded} = this.state;

    const total = orders.length;
    var build_num = 0
    var paint_num = 0
    var delivery_num = 0
    var complete_num = 0
    if (isLoaded){
      for (var i = 0; i < total; i++) { // More efficient than built-in filter functions
        const phase = orders[i]["status"]
        if (phase == 2){ // TODO: this works, but could be cleaner . . .
          build_num ++;
        }
        if (phase == 3){
          paint_num ++;
        }
        if (phase == 4){
          delivery_num ++;
        }
        if (phase ==  5){
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
          </Grid>
          <Grid item xs >
            <NumberStat title="Completed Ramps" stat={complete_num} />
          </Grid>
        </Grid>
        {
          isLoaded && <ListingBox click={(data) => gotoFuncs.ramp_info(true,data, this.props.verifyTokens)} orders={orders} isAdmin = { this.props.isAdmin} isLoaded={isLoaded}/>
        }
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
