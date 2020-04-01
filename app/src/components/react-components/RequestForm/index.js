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
        deliveryType: '',
        rampColor: '',
        managerFirst: '',
        managerSig: '',
        witnessName: '',
        witnessSig: ''
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
	
    handleSubmitOrder = () => {
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
        "delivery_method":this.state.deliveryType,
        "subsidize":false,
        "status":"Request Recieved",
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        "companyName":this.state.companyName,
        "phoneNumber":this.state.phoneNumber}
		
		const token = localStorage.getItem('token-access')
        const requestOptions = {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
            body: JSON.stringify(data)
        };
        fetch('/order-information/', requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
				console.log(data.pk)
                this.setState({ postId: data.pk })
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            }); 
    }
	
	handleSubmitWaiver = () => {
		const data ={
        "signatory_first_name":this.state.managerFirst,
        "signatory_last_name":this.state.managerFirst,
        "signatory_signature":this.state.witnessSig,
        "witness_first_name":this.state.managerFirst,
        "witness_last_name":this.state.managerFirst,
        "witness_signature":this.state.witnessSig}
		const token = localStorage.getItem('token-access')
        const requestOptions = {
            method: 'POST',
            headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			},
            body: JSON.stringify(data)
        };
        fetch('/waiver-information/', requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
				console.log(data.pk)
                this.setState({ postId: data.pk })
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            }); 
	}

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, companyName, phoneNumber,billingAddress, deliveryAddress, deliveryType, rampColor,rightStepHeight, leftStepHeight } = this.state;
   

        switch (step) {
            case 0:
                return <Redirect to="/dashboard" />
            case 1: 
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange= {this.handleChange}
                    
                    />
                )
            case 2:
                return (
                    <ImageUpload
                        nextStep={this.nextStep}
                        handleChange= {this.handleChange}
                    />
                )
            case 3:
                return (
                    <LiabilityWaiver
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
						handleSubmitWaiver={this.handleSubmitWaiver}
						handleSubmitOrder={this.handleSubmitOrder}
                        handleChange={this.handleChange}
                    />
                )
            case 4: 
                return (
                    <div>
                        <h1> Thank you! We'll be in contact about your request.</h1>
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

export default UserForm;
