import React from "react";
import "./styles.css";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";
import ListingBox from "../Listings";

/* Primary Component for the Admin Dashboard page */
class ClientDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      orders: [],
      users:[]
    }
  }

  componentDidMount() {
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
        console.log(result)
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
    )

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
        console.log(result)
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
    )
  }
  

  render() {
    const {gotoFuncs} = this.props;
    const {orders, isLoaded} = this.state;
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
        <ListingBox click={(data) => gotoFuncs.ramp_info(true,data)} orders={orders} isAdmin isLoaded={isLoaded}/>
        {/* <ListingBox click={(id) => this.props.gotoFuncs.ramp_info(false,id)} /> */}
      </div>
    );
  }
}

export default ClientDashboard;
