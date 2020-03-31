import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Button from "@material-ui/core/Button";
import ReactDOM from 'react-dom';
import "./styles.css"
import {Container, Row, Col} from 'react-bootstrap';


class Listing extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            client_name: "clent name",
            business_name: "business name",
            status: "status bar",
        };
    }

    //do something when clicked 

    render(){
        //the html to return 
        return(  
        //how to style a button to actually make it block
        <div>
            <Button classname="listing_button" size="lg" block>
                <Container>
                        <Col>{this.state.client_name}</Col>
                        <Col>{this.state.business_name}</Col>
                        <Col>{this.state.status}</Col>
                </Container>
            </Button>
        </div>      
        );
    }
}

export default Listing;