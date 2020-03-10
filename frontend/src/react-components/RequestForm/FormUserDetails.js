import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values } = this.props;

        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position="static">
                        <Typography variant="h6" >
                            StopGap - Request A Ramp Form
                        </Typography>
                    </AppBar>
                    <br />

                    <div className='form' style={{ marginLeft: '5vh', marginTop: '5vh', marginRight:'20vh' }}>
                        <h1>Please Enter Your Information:</h1>
                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="Required"
                                defaultValue="First Name"
                                onChange={this.props.handleChange('firstName')}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Required"
                                defaultValue="Last Name"
                                onChange={this.props.handleChange('lastName')}
                            />
                        </div> <br />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Email"
                            onChange={this.props.handleChange('email')}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Company Name"
                            onChange={this.props.handleChange('companyName')}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Phone Number"
                            onChange={this.props.handleChange('phoneNumber')}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Delivery Address"
                            onChange={this.props.handleChange('deliveryAddress')}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Delivery Type"
                            onChange={this.props.handleChange('deliveryType')}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Required"
                            defaultValue="Ramp Color"
                            onChange={this.props.handleChange('rampColor')}
                        />

                        <br /> <br />
                        <Button
                            color="primary" variant="contained" onClick={this.continue}> Submit!</Button>
                        <h4>*Please note that we’re currently experiencing a bit of a backlog of ramp requests.
                            We require all the info as mentioned above in order to send you a quote. Upon quote approval, there’s typically an approximate 4-6 weeks turnover.
                            We are so excited that our awareness raising efforts have worked but we’re a very small team working hard at getting more ramps to more steps!</h4>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}
export default FormUserDetails
