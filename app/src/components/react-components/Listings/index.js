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
    this.state = {
      data:{}
    }
  }


  componentDidMount() {
    // fetch("/order-information/")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       const orders = result["results"];
    //       const total_num = orders.length
    //       if(total_num > 0){
    //         for  (var i = 0; i < total_num; i++) {
    //           const id = this.props.id
    //           const check = orders[i]["pk"]
    //           if (id == check){
    //             this.setState({
    //               data:orders[i]
    //             });

    //           }
              

    //         }

         
    //       }
   
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
  }
  render(){

  return (
    <Button className="listing_button" onClick={this.props.click}>
      <Grid container spacing={4}>
      <Grid item xs>{this.props.id} </Grid>
        <Grid item xs>{this.props.fullName}</Grid>
        <Grid item xs>{this.props.business} </Grid>
        <Grid item xs>{this.props.status} </Grid>
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
      listings: [],
      filteredListings: [],
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    // fetch("/order-information/")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       const orders = result["results"];
    //       this.setState({
    //         listings: orders, 
    //         isLoaded: true,
    //       });
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
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
    const { listings, error, isLoaded } = this.state;
    console.log(`listings: ${listings}`)
    if (error) {
      return <div className="block"> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <Skeleton className="block" variant="rect" height={220}/>
    }
    else {
      return (
        <div className="listing_box block">
          <h2 className="block-title">
            Ramp Requests
                    </h2>
          <FilterBox onChange={this.filterListings}></FilterBox>
          <Grid container spacing={4}>
          <  Grid  align="center" item xs>        Order Number</Grid>
           < Grid   align="center" item xs>        Full Name</Grid>
            <Grid  align="center" item xs>        Company </Grid>
            <Grid  align="center"item xs>        Status</Grid>
          </Grid>
          {listings.map((listing,i) => (
            <Listing

              id={listing["pk"] }
              fullName={listing["firstName"] + " " + listing["lastName"]}
              business={listing["companyName"]}
              status={listing["status"]}
              click={e => {

                e.preventDefault();
                this.props.click(listing);
              }}
            />
          ))}
        </div>
      );
    }
  }
}

export default Listing;