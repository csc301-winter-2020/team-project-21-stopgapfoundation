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
function Listing(props){    
        return(  
            <Button className="listing_button" onClick={props.click}>
                <Grid container spacing={3}>
                    <Grid item xs>{props.client_name} </Grid>
                    <Grid item xs>{props.business_name} </Grid>
                    <Grid item xs>{props.status} </Grid>
                </Grid>
            </Button>    
        );
}

class ListingBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listings: Array(3).fill(null),
        }
    }  

    //component will mount
    //for now hard code the data 

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

    render(){
        return(
            <div className="listing_box">
                {this.renderListing(0)}
            </div>
        )
    }

}

export default ListingBox;