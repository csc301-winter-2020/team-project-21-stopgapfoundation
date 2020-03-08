import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button"
import logo from "./static/logo.png"
import Typography from '@material-ui/core/Typography';


import "./styles.css";

class Home extends React.Component {
    render() {
        return (
            <div className = "home__bg center">
                <div id="logoContainer" >
                    <img id="logo" src={logo}></img>
                </div>
                <Link className="home__button-link center_left" to={"./../Login"}>
                    <Button className="login__button" style={{backgroundColor:'#689BF0'}}>Login</Button>
                </Link>
                <Link className="home__button-link center_right" to={"./../Register"}>
                    <Button className="login__button" style={{backgroundColor:'#689BF0'}}>Register</Button>
                </Link>

            </div>
        )
    }
}

export default Home;