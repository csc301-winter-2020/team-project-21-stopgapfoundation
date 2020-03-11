import React from "react";
import Grid from '@material-ui/core/Grid'
import {ReactComponent as RampImage} from "./ramp.svg"
import KeyValue from "../../KeyValue";

/** Component that will display dimensions for the ramp.
 *  Uses a 2D image for now, could potentially be updated to show a 3D model.
 * 
 *  @prop {object} ramp - Data on the ramp. Properties are len (top surface), width, height, depth (length of bottom surface), grade, and color. Each property can be given as a string
 **/
function RampDimensions(props) {
  // const {len, width, height, depth, grade, color} = props.ramp;

  console.log("Ramp Dimensions!");
  console.log(props.ramp.len)

  return (
    <Grid container className={"ramp-dimensions block"} >
      <Grid item xs={12}>
        <h2 className={"block-title"}>
          Ramp Dimensions
        </h2>
      </Grid>

      <Grid item xs={12}>
        <RampImage className={"ramp-dimensions-image center-block"} />
      </Grid>

      <KeyValue data={props.ramp} />
      
    </Grid>    
  );
}

export default RampDimensions;
