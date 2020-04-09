import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import {Skeleton} from '@material-ui/lab';
import TextField from "@material-ui/core/TextField";
import "./styles.css"

//Listing returns a button with the client/business names and status
class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    const {listing, click} = this.props;
    return (
      <Button className="listing_button" onClick={click}>
        <Grid container spacing={4}>
        <Grid item xs>{listing["pk"]} </Grid>
          <Grid item xs>{`${listing['first_name']} ${listing['last_name']}`}</Grid>
          <Grid item xs>{listing['company']} </Grid>
          <Grid item xs>{listing['status']} </Grid>
        </Grid>
      </Button>
    );
  }
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
      filteredListings: [],
      error: null,
    }
  }

  componentWillMount(){
    this.setState({
      filteredListings: this.props.orders
    })
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
    const { filteredListings, error } = this.state;
    const {click, isLoaded} = this.props;
    if (error) {
      return <div className="block"> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <Skeleton className="block" variant="rect" height={220}/>
    }
    return (
      <div className="listing_box block">
        <h2 className="block-title">
          Ramp Requests
                  </h2>
        <FilterBox onChange={this.filterListings}></FilterBox>
        <Grid container spacing={4}>
          <Grid align="center" item xs>       
            Order Number
          </Grid>
          <Grid align="center" item xs>        
            Full Name
          </Grid>
          <Grid align="center" item xs>        
            Company 
          </Grid>
          <Grid align="center" item xs>        
            Status
          </Grid>
        </Grid>
        {filteredListings.map((listing,i) => (
          <Listing
            listing={listing}
            key={i}
            click={e => {

              e.preventDefault();
              click(listing);
            }}
          />
        ))}
      </div>
    );
  }
}

export default ListingBox;