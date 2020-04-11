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
    const all_status = [
      "Request Recieved",
      "Request Accepted",
      "Build Phase",
      "Paint Phase",
      "Out for Delivery",
      "Completed"
    ];
    
    return (
      <Button className="listing_button" onClick={click}>
        <Grid container spacing={4}>
        <Grid item xs>{listing["pk"]} </Grid>
          <Grid item xs>{`${listing['first_name']} ${listing['last_name']}`}</Grid>
          <Grid item xs>{listing['company']} </Grid>
          <Grid item xs>{all_status[listing['status']]} </Grid>
        </Grid>
      </Button>
    );
  }
}

class FilterBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      listingFilter: "",
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
        label="Filter Client by Full Name" 
        variant="filled"
        defaultValue=""
        onChange={this.handleChange}
      />
    )
  }
}

class ListingBox extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      filteredListings: [],
      error: null,
      Loaded:false
    }
  }

  componentWillMount(){
    // console.log(this.props.orders);
    this.setState({
      filteredListings: this.props.orders
    })
  }

  filterListings = (listingFilter) => {

    listingFilter = listingFilter.toLowerCase();
    let filteredListings = this.props.orders;
    filteredListings = filteredListings.filter((listing) =>{
      let client_name = `${listing['first_name']} ${listing['last_name']}`.toLowerCase();
      // console.log(`    ${client_name}`);
      return client_name.includes(listingFilter)
    });
    this.setState ({
      filteredListings
    });
  }

  
  

  

  render () {
    const { filteredListings, error,Loaded } = this.state;
    const click= this.props.click;
    const isLoaded = this.props.isLoaded
    if (error) {
      return <div className="block"> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <Skeleton className="block" variant="rect" height={220}/>
    }

 
   

    if (isLoaded && !Loaded)
    this.setState({
      filteredListings: this.props.orders,
      Loaded:true
    })


    
  

  

    return (
      <div className="listing_box block">
        <h2 className="block-title">
          Ramp Requests
                  </h2>
        {this.props.isAdmin &&
        <FilterBox onChange={this.filterListings}></FilterBox>}
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