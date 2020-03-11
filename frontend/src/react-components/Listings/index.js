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
        <div>
            <Button className="listing_button">
                <Grid container spacing={3}>
                    <Grid item xs>{props.client_name} </Grid>
                    <Grid item xs>{props.business_name} </Grid>
                    <Grid item xs>{props.status} </Grid>
                </Grid>
            </Button>
        </div>      
        );
}

class ListingBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listings: Array(3).fill(null),
        }
    }  

    renderListing(){
        //hard coded for now, need to figure out how to connect it
        //probably use a counter and render x buttons 
        var client = "John";
        var business = "Apple";
        var status = "75%";
        return (
            <Listing client_name = {client} business_name = {business} status = {status}>
            </Listing>
        )
    }

    render(){
        return(
            <div className="listing_box">
                {this.renderListing()}
                {this.renderListing()}
                {this.renderListing()}
                {this.renderListing()}
            </div>
        )
    }

}

export default ListingBox;