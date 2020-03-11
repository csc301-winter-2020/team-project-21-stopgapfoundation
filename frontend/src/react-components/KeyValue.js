import React from "react";
import Grid from "@material-ui/core/Grid";

/**
 * Component to list key-value pairs from an object
 *
 * @prop {object} data - An object whose entries will be displayed. Ideally, values would be strings.
**/
function KeyValue(props){
  // data = [];
  // for (let [key, value] of Object.entries(props.data)){

  // }

    const data = Object.entries(props.data).map( x => {
      let key = x[0] === "len" ? "length" : x[0]; // special case for "length" key (as length is a keyword)
      key = key.charAt(0).toUpperCase() + key.slice(1)
      const value = x[1]

      return (
        <Grid container className={"kv"}>
          <Grid item xs={6} className={"kv-key"}>
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
    });

  return data;
}

export default KeyValue;