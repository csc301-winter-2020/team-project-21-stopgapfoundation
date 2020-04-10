import React, { Component } from 'react'
import {Box, TextField, Checkbox, FormControlLabel} from '@material-ui/core';
import Button from '@material-ui/core/Button'


export class LiabilityWaiver extends Component {
  continue = e => {
    e.preventDefault();
	this.props.handleSubmitWaiver();
    this.props.handleSubmitOrder();
	this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  render () {
    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Liability Waiver, Assumption of Risk and Idemnity </h1>
        <form onSubmit={this.continue}>
        <div className='container' style={{ width: '900px' }}>

          <Box style={{ float: "left" }} border={3} marginLeft='5vh' maxWidth="900px">Congratulations on joining The Ramp Project! By signing this document you waive certain legal rights, including the right to sue. Please read carefully before signing.
                    <br></br><br></br>I understand that The StopGap Foundation (“StopGap”) will construct and provide my business with a temporary ramp to be used to access my single stepped storefront. Once StopGap delivers the ramp, it is my property and my sole responsibility.
                    <br></br><br></br>I understand that in order to participate in The Ramp Project, I must agree to and sign this waiver and indemnity.
                    <br></br><br></br>I know that this ramp is not intended to be a permanent ramp to my storefront and that the ramp should only be used when needed. When in use, the ramp should be level and flush against the step with no gaps present. When the ramp is not in use, it should be stored in a safe location.
                    <br></br><br></br>I understand that the use or storage of the ramp could cause injury to persons or property. I accept all of the risks of my participation in The Ramp Project and the possibility of personal injury, death, property damage, or loss, whether caused by the negligence of Stop Gap or otherwise.
                    <br></br><br></br>I assume full responsibility and all liability for my acts or omissions, whether negligent or otherwise, in connection with my participation in The Ramp Project. I voluntarily and unconditionally release StopGap, its employees, contractors, agents, directors or volunteers from all claims including, but not limited to, personal injury and property damage, whether caused by negligence or otherwise, which I have or may have in the future.
                    <br></br><br></br>I agree to indemnify StopGap, its employees, contractors, agents, directors or volunteers for any and all liabilities, damages, costs, claims, suits, and actions that are directly or indirectly related to my activities or my participation in The Ramp Project. I agree not to sue or bring legal action against anyone who could seek contribution or indemnity from StopGap, its employees, contractors, agents, directors or volunteers under the Negligence Act.
                </Box>
          <FormControlLabel
            required
            control={<Checkbox required onChange={this.handleChange} name="check" />}
            label="I understand and agree to the Liability Waiver."
            style={{ marginLeft: '40px' }}
          />

        <Box style={{ float:'left', marginTop: '40px', marginLeft:'5vh' }} maxWidth='500px' border={3}>
         
            <TextField
              required
              id="standard-required"
              label="Owner First/Last Name"
              defaultValue=""
              onChange={this.props.handleChange('managerFirst')}
            />
            <TextField
              required
              id="standard-required"
              label="Owner Signature"
              defaultValue=""
              onChange={this.props.handleChange('managerSig')}
            />
            <br></br>
            <br></br>
            <TextField
              required
              id="standard-required"
              label="Witness Name"
              defaultValue=""
              onChange={this.props.handleChange('witnessName')}
            />
            <TextField
              required
              id="standard-required"
              label="Witness Signature"
              defaultValue=""
              onChange={this.props.handleChange('witnessSig')}
            />
            <br></br>
          <Button
            style={{ right: 1, marginTop: '10px' }} color="primary" variant="contained" onClick={this.back}>Previous
         </Button>
          <Button type = "submit" style={{ left: 6, marginTop: '10px' }} color="primary" variant="contained">
            Next
          </Button>
           </Box>
            </div>
          </form>
          </div>
        )
    }
}

export default LiabilityWaiver
