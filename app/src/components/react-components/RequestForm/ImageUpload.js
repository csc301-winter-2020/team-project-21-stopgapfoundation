import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import ImageUploader from 'react-images-upload';
import Upload from "./Upload/Upload"

export class ImageUpload extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }


  render () {
    const { values } = this.props;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar position="static">
            <Typography variant="h6" >
              Ramp Request Form
                        </Typography>
          </AppBar>
          <br />

          <form onSubmit={this.continue} style={{ marginLeft: '5vh', marginTop: '5vh', marginRight: '20vh' }}>
            <h1>Upload your Images:</h1>
            <h3>StopGap requires three images to process your ramp request:</h3>
            <ul>
              <li>
                <h4>Photo of entire entryway</h4>
                Take a look at the entryway and envision the placement of the ramp.
                Take a picture of the entire entrance including the step in front of the doorway and the sidewalk.
                For a safe turning radius, you will need 42″ of space in addition to the length of the ramp (which is 6 times the height of the step).
                                <br /> <br />
                * Entryway image loader here *
                <div><Upload imageIdentifier="entrywayPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
              </li>
              <li>
                <h4>Photo of Left Side Step</h4>
                <br />
                * Left side image loader here *
                <div><Upload imageIdentifier="stepLeftPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
              </li>
              <li>
                <h4>Photo of Right Side Step</h4>
                <br />
                * Right side image loader here *
                <div><Upload imageIdentifier="stepRightPhoto" handlePicture={this.props.handlePicture} required></Upload></div>
              </li>
            </ul>
            <div></div>
            <br /> <br />
            <h3>
              Please estimate the height of your step and enter them below.
              Your measurement selection will be verified by StopGap staff by evaluating your measurement photo submissions.
              We may request new or additional photos to best design the ramp to fit your step.
                        </h3>
            <TextField
              required
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
              type="number"
              inputProps={{ min: "0", max: "100", step: "0.01" }}
              id="standard-required"
              label="Step Height - Right"
              defaultValue=""
              onChange={this.props.handleChange('rightStepHeight')}
            />
            <br /> <br />
            <Button
              style={{ right: 10 }} color="primary" variant="contained" onClick={this.back}>Previous</Button>
            <Button
              type= "submit" color="primary" variant="contained" >Next
                        </Button>
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

export default ImageUpload;

/*
                                <ImageUploader
                                    withIcon={true}
                                    buttonText="Upload right side step image"
                                    onChange={this.props.handleChange('rightStepImage')}
                                    imgExtension={['.jpg', '.gif', '.png']}
                                    maxFileSize={5242880}
                                ></ImageUploader>
*/