import React from 'react';
import Navbar from "../Navbar/index"
import TextField from '@material-ui/core/TextField'
import './styles.css';

class RequestForm extends React.Component {
    render() {
        return (
            <div>
                <Navbar title="Request Form" />
                    {/* <h3 style={{display:'inlineBlock'}}>Ramp Request Form</h3> */}
                <form id='requestForm'>
                    <div>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="First Name"
                            variant="filled"
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="Last Name"
                            variant="filled"
                        />
                        </div>
                        <div>
                        <br/>
                        <TextField
                            optional
                            id="filled-required"
                            label="Optional"
                            defaultValue="Company Email"
                            variant="filled"
                        />
                        <br/><br/>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="Email"
                            variant="filled"
                        />
                        <br/><br/>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="Phone Number"
                            variant="filled"
                        />
                        <br/><br/>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="Delivery Address"
                            variant="filled"
                        />
                        <br/><br/>
                        <TextField
                            optional
                            id="filled-required"
                            label="Optional"
                            defaultValue="Website"
                            variant="filled"
                        />
                                                <br/>
                        <br/>
                        <TextField
                            required
                            id="filled-required"
                            label="Required"
                            defaultValue="Delivery Type"
                            variant="filled"
                        />
                        <br/>
                        <br/>
                        <TextField
                            optional
                            id="filled-required"
                            label="Optional"
                            defaultValue="Ramp Color"
                            variant="filled"
                        />
                    </div>
                </form>



            </div>

        )
    }


}
export default RequestForm;