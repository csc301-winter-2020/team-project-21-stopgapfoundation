import React from "react";
import {ReactComponent as RampImage} from "./ramp.svg"

/** Component that will display dimensions for the ramp.
 *  Uses a 2D image for now, could potentially be updated to show a 3D model.
 * 
 *  @prop {object} ramp - Data on the ramp. Properties are length (top surface), width, height, depth (length of bottom surface), grade, and color. Each property can be given as a string
 **/
function RampDimensions(prop) {
  return (
    <div>
      <RampImage />
    </div>
  );
}

export default RampDimensions;
