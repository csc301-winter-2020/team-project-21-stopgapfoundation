import React from "react";
import Grid from '@material-ui/core/Grid'
import {ReactComponent as RampImage} from "./ramp.svg"

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
    <div>
      <Grid container className={"ramp-dimensions block"} >
        <Grid item xs={12}>
          <h2 className={"block-title"}>
            Ramp Dimensions
          </h2>
        </Grid>

        <Grid item xs={12}>
          <RampImage className={"ramp-dimensions-image center-block"} />
        </Grid>
        
        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
            <strong >
              Length
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.len   }
            </span>
          </Grid>
        </Grid>
        
        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
            <strong>
              Width
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.width }
            </span>
          </Grid>
        </Grid>
        

        <Grid container className={"kv"}>
          <Grid item xs={6}  className={"kv-key"}>
            <strong>
              Height
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.height}
            </span>
          </Grid>
        </Grid>

        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
            <strong>
              Depth 
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.depth }
            </span>
          </Grid>
        </Grid>

        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
            <strong>
              Grade 
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.grade }
            </span>
          </Grid>
        </Grid>

        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
            <strong>
              Color 
            </strong>
          </Grid>
          <Grid item xs={6} className={"kv-value"}>
            <span>
              {props.ramp.color }
            </span>
          </Grid>
        </Grid>
      </Grid>
    </div>
    
  );
}

export default RampDimensions;
