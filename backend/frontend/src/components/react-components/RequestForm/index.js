import React, { Component } from 'react'
import FormUserDetails from './FormUserDetails';

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

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, companyName, phoneNumber, deliveryAddress, deliveryType, rampColor } = this.state;
        const values = { firstName, lastName, email, companyName, phoneNumber,  deliveryAddress, deliveryType, rampColor}

        switch(step) {
            case 1: 
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange= {this.handleChange}
                        values = {values} 
                    
                    />
                )
            case 2:
                return(
                    <LiabilityWaiver
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values = {values}
                    />
                )
            case 3:
                return <h1> Thank you! We'll be in contact about your request. </h1>
            case 4:
                return <h1>Success</h1>
        }
        return (
            <div>
                
            </div>
        )
    }
}

export default UserForm
