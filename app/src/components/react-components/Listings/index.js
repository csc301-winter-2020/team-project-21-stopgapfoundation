import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import ReactDOM from 'react-dom';
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
    fetch("/order-information/")
      .then(res => res.json())
      .then(
        (result) => {
          const orders = result["results"];
          const total_num = orders.length
          if(total_num > 0){
            for  (var i = 0; i < total_num; i++) {
              const id = this.props.id
              const check = orders[i]["pk"]
              if (id == check){
                this.setState({
                  data:orders[i]
                });

              }
              

            }

         
          }
   
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
  render(){

  return (
    <Button className="listing_button" onClick={this.props.click}>
      <Grid container spacing={3}>
        <Grid item xs>{this.props.id} </Grid>
        <Grid item xs>{this.props.date}</Grid>
        <Grid item xs>{this.props.address} </Grid>
      </Grid>
    </Button>
  );
  }
}

class ListingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      error: null,
      isLoaded: false,
    }
  }
  /*
  renderListing(i){
      //i not used for now, figure it will be used when iterating through requests
      //variables as placeholders for the information when fetched from requests
      var client = "";
      var business = "";
      var status = "";
      return (
          <Listing client_name = {client} business_name = {business} status = {status}>
          </Listing>
      )
  }
  */

  //pulls the information into 
  // componentDidMount= () => {
  //     fetch("/order-information")
  //     .then(res => {res.json()})
  //     .then(
  //         (result) => {
  //             this.setState({
  //                 isLoaded: true, 
  //                 listings: result["results"],
  //             });
  //         }
  //     ),
  //     (error) => {
  //         this.setState({
  //             isLoaded: true,
  //             error
  //         });
  //     }
  //     // this.setState({
  //     //     isLoaded: true, 
  //     //     listings: [
  //     //         {
  //     //             client_name: "John Smith",
  //     //             business_name: "Business Inc.",
  //     //             status: "Paint Phase"
  //     //         }
  //     //     ],
  //     // });
  //}

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


      
  

  render () {
    const { listings, error, isLoaded } = this.state;
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
          {listings.map((listing, i) => (
            <Listing
              id={listing["pk"]}
              date={listing["date_created"]}
              address={listing["shipping_address"]}
              click={ (e) => {
              
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

export default ListingBox;