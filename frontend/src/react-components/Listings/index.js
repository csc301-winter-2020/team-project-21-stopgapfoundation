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


class Listing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            client_name: null,
            business_name: null,
            status: null,
        }
    }
    
    render(){
        return(  
        <div>
            <Button className="listing_button">
                <Grid container spacing={3}>
                    <Grid item xs>{this.props.client_name} </Grid>
                    <Grid item xs>{this.props.business_name} </Grid>
                    <Grid item xs>{this.props.status} </Grid>
                </Grid>
            </Button>
        </div>      
        );
    }
}

class ListingBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listings: Array(3).fill(null),
        }
    }  

    createListing(i){
        const all_listings = this.state.listings.slice();
        //need the info of the current listing, using numbers as placeholders
        const client = <Listing client_name= "1" business_name="2" status="3"></Listing>
        //set the link to the correct form
        all_listings[i] = client;

        this.setState({
            listings: all_listings
        });
    }

    renderListing(i){
        return (
            <Listing> {this.state.listings[1]} </Listing>
        )
    }

    render(){
        this.createListing(1);
        
        return(
            <div className="listing_box">
                {this.renderListing(1)}
            </div>
        )
    }

}

export default Listing;