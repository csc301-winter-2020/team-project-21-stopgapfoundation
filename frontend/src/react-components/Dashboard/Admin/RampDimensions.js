import React from "react";
import Grid from '@material-ui/core/Grid'
import {ReactComponent as RampImage} from "./ramp.svg"
import KeyValue from "../../KeyValue";

/** Component that will display dimensions for the ramp.
 *  Uses a 2D image for now, could potentially be updated to show a 3D model.
 * 
*  @prop {object} ramp - Data on the ramp. Properties given are l_height, r_height, and color. The remaining properties are calculated. Width measurements are numbers measured in inches.
 **/
function RampDimensions(props) {
  const {l_height, r_height, color} = props.ramp;
  const len = Math.max(l_height, r_height) * 6;
  const width = 34;
  const r_grade = (Math.atan(r_height / len) * (180 / Math.PI)).toFixed(2);
  const l_grade = (Math.atan(l_height / len) * (180 / Math.PI)).toFixed(2);

  const data= {};
  data["Length"] = `${len}"`;
  data["Width"] = `${width}"`;
  data["Left Height"] = `${l_height}"`;
  data["Right Height"] = `${r_height}"`;
  data["Left Grade"] = `${l_grade}deg`;
  data["Right Grade"] = `${r_grade}deg`;
  data["Color"] = color;

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

      <KeyValue data={data} />
      
    </Grid>    
  );
}

export default RampDimensions;
