import React from 'react';
import logo from "../../img/logo.png";
import './styles.css';
import { Button, Grid } from '@material-ui/core';
import {Link} from "react-router-dom";

class Nav extends React.Component {
    /*Will need to use states to change the title of the navbar*/
    render() {
        return (
            <div className="navbar">
                <Grid container>
                    <Grid item xs={3}>
                        <span className="navTitle"><h3><b>{this.props.title}</b></h3></span>
                    </Grid>
                    <Grid item xs={6}>
                        <span><img className='center' src={logo}></img></span>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to="/login">
                            <Button>Log Out</Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        )
    }

}
export default Nav;