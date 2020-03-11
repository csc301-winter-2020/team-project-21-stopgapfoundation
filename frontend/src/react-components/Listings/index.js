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
    componentDidMount() {
        fetch("api here")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true, 
                    listings: result.items,
                });
            }
        ),
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    }

    render(){
        const {listings, error, isLoaded} = this.state;
        if(error){
            return <div> Error: {error.message}</div>
        }
        else if (!isLoaded){
            return <div>Loading...</div>
        }
        else{
            return(
                <div className="listing_box">
                    {listings.map(listing => 
                    (<Listing client_name=
                    {listings.client_name} business_name={listings.business_name} status={listings.status}> 
                    </Listing>
                    ))}
                </div>
            );
        }
    }
}

export default ListingBox;