import React, { Component } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper'


export class FormUserDetails extends Component {

    constructor(props) {
        super(props);
        this.form = React.createRef();
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {

        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar position="static" style={{ background: '#2F4858', textAlign: 'center' }}>
                        <Typography variant="h5" style={{marginTop:'10px', marginBottom:'10px'}}>
                            Ramp Request Form
                        </Typography>
                    </AppBar>
                    <br />

                    <form ref={this.form} onSubmit={this.continue} style={{ marginLeft: '7vh', marginTop: '5vh', marginRight: '20vh' }}>
                        <h1>Please Enter Your Information:</h1>
                        <div className="formFields">
                            <TextField
                                required
                                id="standard-required"
                                label="First Name"
                                defaultValue=""
                                onChange={this.props.handleChange('firstName')}
                                style={{ marginRight: '10px' }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Last Name"
                                defaultValue=""
                                onChange={this.props.handleChange('lastName')}
                            />
                        </div> <br />
                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                defaultValue=""
                                onChange={this.props.handleChange('email')}
                                style={{ marginRight: '10px' }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Phone Number"
                                defaultValue=""
                                onChange={this.props.handleChange('phoneNumber')}
                                style={{ marginRight: '10px' }}
                            />
                            <TextField
                                required
                                id="standard-required"
                                label="Organization Name"
                                defaultValue=""
                                onChange={this.props.handleChange('companyName')}
                                style={{ marginRight: '10px' }}
                            />
                        </div>

                        <br />
                        <TextField
                            required
                            id="standard-required"
                            label="Delivery Address"
                            defaultValue=""
                            onChange={this.props.handleChange('deliveryAddress')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Billing Address"
                            defaultValue=""
                            onChange={this.props.handleChange('billingAddress')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Delivery Type"
                            defaultValue=""
                            onChange={this.props.handleChange('deliveryType')}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            required
                            id="standard-required"
                            label="Ramp Color"
                            defaultValue=""
                            onChange={this.props.handleChange('rampColor')}
                            style={{ marginRight: '10px' }}
                        />
                        <label>
                            <Checkbox
                                onClick={this.props.handleCheck('subsidize')}
                                name="check"
                                style={{ marginLeft: '40px' }}
                            />
                            <span>Subsidize</span>
                        </label>
                        <br /> <br />
                        <div style={{margin:10}}>
                            <Button
                                style={{ right: 10 }} color="primary" variant="contained" onClick={this.back}>Previous</Button>
                            <Button
                                type="submit" color="primary" variant="contained" >Next</Button>
                        </div>

                        <div style={{ maxWidth: '65vh'}}>
                            <h4>
                                *Please note that we’re currently experiencing a bit of a backlog of ramp requests.
                                We require all the info as mentioned above in order to send you a quote. Upon quote approval, there’s typically an approximate 4-6 weeks turnover.
                                We are so excited that our awareness raising efforts have worked but we’re a very small team working hard at getting more ramps to more steps!
                            </h4>
                        </div>
                    </form>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}
export default FormUserDetails
