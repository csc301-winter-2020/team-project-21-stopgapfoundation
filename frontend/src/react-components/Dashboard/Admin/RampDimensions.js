import React from "react";
import {ReactComponent as RampImage} from "./ramp.svg"

/** Component that will display dimensions for the ramp.
 *  Uses a 2D image for now, could potentially be updated to show a 3D model.
 * 
 *  @prop {object} ramp - Data on the ramp. Properties are len (top surface), width, height, depth (length of bottom surface), grade, and color. Each property can be given as a string
 **/
function RampDimensions(props) {
  const {len, width, height, depth, grade, color} = props.ramp || "";

  return (
    <div>
      <RampImage />
      <p>
        <strong>Length</strong>{len   }
      </p>
      <p>
        <strong>Width </strong>{width }
      </p>
      <p>
        <strong>Height</strong>{height}
      </p>
      <p>
        <strong>Depth </strong>{depth }
      </p>
      <p>
        <strong>Grade </strong>{grade }
      </p>
      <p>
        <strong>Color </strong>{color }
      </p>
    </div>
  );
}

export default RampDimensions;
