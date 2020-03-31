import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';
import ImageUpload from './ImageUpload';
import LiabilityWaiver from './LiabilityWaiver';
import { Redirect, Link } from 'react-router-dom';

export class UserForm extends Component {
    state = {
        step: 1, 
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        phoneNumber: '', 
        deliveryAddress: '',
        billingAddress: '',
        deliveryType: '',
        rampColor: '',
        managerFirst: '',
        managerSig: '',
        witnessName: '',
        witnessSig: '',
        rightStepHeight: '',
        leftStepHeight:''

    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    // Handle Field Changes
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }
	
	submitField = input => {
		
	}

    componentDidMount() {
        const data ={
        "billing_address":this.state.deliveryAddress,
        "shipping_address":this.state.billingAddress,
        // "waiver":1,
        // "entryway_photo":"http://localhost:8000/order-information/data/user_2/step_photos/200XY_hnIn8xv.png",
        // "step_left_photo":"http://localhost:8000/order-information/data/user_2/step_photos/15000.png",
        // "step_right_photo":"http://localhost:8000/order-information/data/user_2/step_photos/gan1.png",
        "step_left_height":this.state.leftStepHeight,
        "step_right_height":this.state.rightStepHeight,
        "ramp_colour":this.state.ramp_colour,
        "delivery_method":this.state.ramp_colour,
        "subsidize":false,
        "status":"Request Recieved",
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        "companyName":this.state.companyName,
        "phoneNumber":this.state.phoneNumber}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('/form', requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                this.setState({ postId: data.id })
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, companyName, phoneNumber,billingAddress, deliveryAddress, deliveryType, rampColor,rightStepHeight, leftStepHeight } = this.state;
        const values = { firstName, lastName, email, companyName, phoneNumber,billingAddress,  deliveryAddress, deliveryType, rampColor,rightStepHeight, leftStepHeight}

        switch (step) {
            case 0:
                return <Redirect to="/dashboard" />

            case 1: 
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange= {this.handleChange}
                        values = {values} 
                    
                    />
                )
            case 2:
                return (
                    <ImageUpload
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange= {this.handleChange}
                        values = {values}
                    />
                )
            case 3:
                return (
                    <LiabilityWaiver
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values = {values}
                    />
                )
            case 4:
                return (
                    <div>
                        <h1> Thank you! We'll be in contact about your request. </h1>
                        <Link to="/dashboard">
                            Go back home.
                        </Link>
                    </div>
                )
        }
        return (
            <div>
                
            </div>
        )
    }
}

export default UserForm
