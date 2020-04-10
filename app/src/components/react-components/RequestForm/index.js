import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';
import ImageUpload from './ImageUpload';
import LiabilityWaiver from './LiabilityWaiver';
import { Redirect, Link } from 'react-router-dom';

export class UserForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
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
            witnessSig: '',
            entrywayPhoto: '',
            stepLeftPhoto: '',
            stepRightPhoto: '',
            subsidize: false
        }

        this.handlePicture = this.handlePicture.bind(this)
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
	
	handleCheck = input => e => {
        this.setState({[input]: !this.state.subsidize})
    }

    handlePicture(input, url) {

        if (input == "entrywayPhoto") {
            this.setState({
                entrywayPhoto: url
            });
        } else if (input == "stepLeftPhoto") {
            this.setState({
                stepLeftPhoto: url
            });
        } else if (input == "stepRightPhoto") {
            this.setState({
                stepRightPhoto: url
            });
        }
    }
	
    handleSubmitOrder = () => {
        const data ={
        "pk":1,
        "user":1,
        "first_name":this.state.firstName,
        "last_name":this.state.lastName,
        "email":this.state.email,
        "company":this.state.companyName,
        "phone_number":this.state.phoneNumber,
        "billing_address": this.state.deliveryAddress,
        "shipping_address": this.state.billingAddress,
        "waiver":1,
        "entryway_photo": this.state.entrywayPhoto,
        "step_left_photo": this.state.stepLeftPhoto,
        "step_right_photo": this.state.stepRightPhoto,
        "step_left_height":parseFloat(this.state.leftStepHeight),
        "step_right_height":parseFloat(this.state.rightStepHeight),
        "ramp_colour":this.state.rampColor,
        "delivery_method":this.state.deliveryType,
        "subsidize":this.state.subsidize,
        "status":"Request Recieved",
		"notes":"There is no notes now"
        }

        console.log(data)
		
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
                console.log(response)
                console.log(data)
    
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
                console.log( error);
            }); 
    }
	
	handleSubmitWaiver = () => {
		const data ={
		//"pk":1,
		"user":1,
        "signatory_first_name":this.state.managerFirst,
        "signatory_last_name":this.state.managerFirst,
        "signatory_signature":this.state.witnessSig,
        "witness_first_name":this.state.witnessName,
        "witness_last_name":this.state.witnessName,
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
				console.log(data)
                this.setState({ postId: data.pk })
            })
            .catch(error => {
                this.setState({ errorMessage: error });
                console.error('There was an error!', error);
            }); 
	}

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, companyName, phoneNumber,billingAddress, deliveryAddress, deliveryType, rampColor,rightStepHeight, leftStepHeight, subsidize } = this.state;
   

        switch (step) {
            case 0:
                return <Redirect to="/dashboard" />
            case 1: 
                return (
                    <FormUserDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
						handleCheck={this.handleCheck}
                    
                    />
                )
            case 2:
                return (
                    <ImageUpload
						prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handlePicture={this.handlePicture}
                        handleChange={this.handleChange}
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
