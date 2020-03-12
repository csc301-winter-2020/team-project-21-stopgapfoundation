import React from "react";
import Grid from '@material-ui/core/Grid'
import {ReactComponent as IconLeftGrade} from "./ramp-icons/left_grade.svg";
import {ReactComponent as IconRightGrade} from "./ramp-icons/right_grade.svg";
import {ReactComponent as IconLeftHeight} from "./ramp-icons/left-height.svg";
import {ReactComponent as IconRightHeight} from "./ramp-icons/right-height.svg";
import {ReactComponent as IconLength} from "./ramp-icons/length.svg";
import {ReactComponent as IconWidth} from "./ramp-icons/width.svg";
import KeyValue from "../../KeyValue";

/** Component that will display dimensions for the ramp.
 *  Uses a 2D image for now, could potentially be updated to show a 3D model.
 * 
//  *  @prop {object} ramp - Data on the ramp. Properties given are l_height, r_height, and color. The remaining properties are calculated. Width measurements are numbers measured in inches.
 **/
class RampDimensions extends React.Component{

  constructor(props) {
    super(props);
    console.log(this.props);
  }


  render() {
    const { ramp } = this.props;

    const l_height = ramp.l_height;
    const r_height = ramp.r_height;
    const color = ramp.color;
    const len = Math.max(l_height, r_height) * 6;
    const width = 34;
    const r_grade = (Math.atan(r_height / len) * (180 / Math.PI)).toFixed(2);
    const l_grade = (Math.atan(l_height / len) * (180 / Math.PI)).toFixed(2);

    const data = {
      "Length": {
        value: `${len}"`,
        icon: < IconLength style={{width: "24px", height: "auto"}}/>
      },
      "Width": {
        value: `${width}"`,
        icon: < IconWidth style={{width: "24px", height: "auto"}}/>
      },
      "Left Height": {
        value: `${l_height}"`,
        icon: < IconLeftHeight style={{width: "24px", height: "auto"}}/>
      },
      "Right Height": {
        value: `${r_height}"`,
        icon: < IconRightHeight style={{width: "24px", height: "auto"}}/>
      },
      "Left Grade": {
        value: `${l_grade}deg`,
        icon: < IconLeftGrade style={{width: "24px", height: "auto"}}/>
      },
      "Right Grade": {
        value: `${r_grade}deg`,
        icon: < IconRightGrade style={{width: "24px", height: "auto"}}/>
      },
      "Color": {
        value: color,
        icon: null
      },
    };

    return ( 
      <div className={"block"}>
        {/* This div is seperate from the grid container because this needs the "block" class. If the class is on Grid, layout issues appear. */ }
        <Grid container className={"ramp-dimensions"} >
          <Grid item xs={12}>
            <h2 className="block-title">
              Ramp Dimensions
            </h2>
          </Grid>

          {/* Diagram not needed unless it matches ramp size. */}
          {/* <Grid item xs={12}>
            <RampImage className={"ramp-dimensions-image center-block"} />
          </Grid> */}
          {
            Object.entries(data).map((x, i) => {
              const key = x[0];
              const {value, icon} = x[1];

              return (
                <Grid container className={"kv"} key={i}>
                  <Grid item xs={1} className={"kv-key"}>
                    {icon && icon}
                  </Grid>
                  <Grid item xs={5} className={"kv-key"}>
                    <strong >
                      {key}
                    </strong>
                  </Grid>
                  <Grid item xs={6} className={"kv-value"}>
                    <span>
                      {value}
                    </span>
                  </Grid>
                </Grid>
              );
            })
          }

          {/* TODO: add icons to keys */}

        </Grid>   
      </div>
    );
  }
  
}

export default RampDimensions;
