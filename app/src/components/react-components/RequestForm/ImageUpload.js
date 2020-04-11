import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import ImageUploader from 'react-images-upload';
import Upload from "./Upload/Upload"

export class ImageUpload extends Component {
  constructor(props) {
    super(props)

    

    this.state = {
        show:false
    }

}
  continue = e => {
    e.preventDefault();
    if (this.props.Uploaded){
      this.props.nextStep();
    }else{

      this.setState({
        show:true
      });


    }

  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render() {
    const { values } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar position="static" style={{ background: '#2F4858', textAlign: 'center' }}>
            <Typography variant="h5" style={{ marginTop: '10px', marginBottom: '10px' }}>
              Ramp Request Form
                        </Typography>
          </AppBar>


          <div style={{ marginLeft: '7vh', marginTop: '5vh', height: '100%' }}>
            <h1>Upload Ramp Images:</h1>
            <h3>StopGap requires three images to process your ramp request.</h3>



            <form onSubmit={this.continue}>
              <ul>
                <li>
                  <h4>Photo of entire entryway</h4>
                  <div style={{ maxWidth: '50vh' }}>
                    Take a look at the entryway and envision the placement of the ramp.
                    Take a picture of the entire entrance including the step in front of the doorway and the sidewalk.
                    For a safe turning radius, you will need 42″ of space in addition to the length of the ramp (which is 6 times the height of the step).
                </div>
                <br />
                <div><Upload imageIdentifier="entrywayPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
                </li>
                <li>
                  <h4>Photo of Left Side Step</h4>
                  <div><Upload imageIdentifier="stepLeftPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
                </li>
                <li>
                  <h4>Photo of Right Side Step</h4>
                  <div><Upload imageIdentifier="stepRightPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
                </li>
              </ul>
            </form>
            <br />
            <hr style={{maxWidth:'90%'}}></hr>
            <br />
            <div style={{ maxWidth: '50vh' }}>
              Please estimate the height of your step and enter them below.
              Your measurement selection will be verified by StopGap staff by evaluating your measurement photo submissions.
              We may request new or additional photos to best design the ramp to fit your step.
                        </div>
            <br />
            <TextField
              required
              style={{ width: '30vh' }}
              type="number"
              inputProps={{ min: "0", max: "100", step: "0.01" }}
              id="standard-required"
              label="Step Height - Left"
              defaultValue=""
              onChange={this.props.handleChange('leftStepHeight')}
            />
            <br /> <br />
            <TextField
              required
              style={{ width: '30vh' }}
              type="number"
              inputProps={{ min: "0", max: "100", step: "0.01" }}
              id="standard-required"
              label="Step Height - Right"
              defaultValue=""
              onChange={this.props.handleChange('rightStepHeight')}
            />
            {this.state.show &&<h4 style={{ left: 10, color:'red' }} >
              Please ensure that you've uploaded all the necessary photos.
              </h4>}
            <br /> <br />
            
            <div style={{ marginBottom: '10px' }}>
              <Button
                style={{ right: 10 }} color="primary" variant="contained" onClick={this.back}>Previous
              </Button>
              <Button
                type="submit" color="primary" variant="contained" onClick={this.continue}>Next
              </Button>
            </div>


          </div>

          
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default ImageUpload;
