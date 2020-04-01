import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ReactDOM from 'react-dom';
import "./styles.css"
import {Container, Row, Col} from 'react-bootstrap';

//Listing returns a button with the client/business names and status
function Listing (props) {
  return (
    <Button className="listing_button" onClick={props.click}>
      <Grid container spacing={3}>
        <Grid item xs>
          {props.fullName}
        </Grid>
        <Grid item xs>{props.business} </Grid>
        <Grid item xs>{props.status} </Grid>
      </Grid>
    </Button>
  );
}

class FilterBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listingFilter: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      listingFilter: e.target.value
    })
    this.props.onChange(e.target.value)
  }

  render(){
    return (
      <TextField 
        id="filled-basic" 
        label="Filter Client" 
        variant="filled"
        defaultValue=""
        onChange={this.props.handleChange}
      />
    )
  }
}

class ListingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      filteredListings: [],
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch("/order-information/")
      .then(res => res.json())
      .then(
        (result) => {
          const orders = result["results"];
          this.setState({
            listings: orders, 
            isLoaded: true,
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

  filterListings = (listingFilter) => {
    let filteredListings = this.state.listings
    filteredListings = filteredListings.filter((listing) =>{
      let client_name = listing.client_name
      return client_name.indexOf(
        listingFilter) !== -1
    })
    this.setState ({
      filteredListings
    })
  }

  render () {
    const {listings, error, isLoaded } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
      return (
        <div className="listing_box block">
          <h2 className="block-title">
            Ramp Requests
                    </h2>
          <FilterBox onChange={this.filterListings}></FilterBox>
          {listings.map((listing, i) => (
            <Listing
              fullName={listing["firstName"] + " " + listing["lastName"]}
              business={listing["companyName"]}
              status={listing["status"]}
              click={e => {
                e.preventDefault();
                this.props.click(i);
              }}
            />
          ))}
        </div>
      );
    }
}

export default Listing;