import React from "react";
import Grid from "@material-ui/core/Grid";

/**
 * Component to display general info about a ramp request
 *
 * @prop {boolean} isAdmin - When true, admin-specific functionality will appear
**/
class GeneralInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        "place": "holder"
      }
    };
  }

  componentDidMount() {
    console.log(this.state);
    this.setState({
      data: {
        "Liability Waiver": "Not Signed",
        "Delivery Address": "123 Street Road, Toronto, ON",
        "Business Name": "Regular Business Inc.",
        "Client Name": "John Smith"
      }
    })
  }

  render() {
    return (
      <div className={"block"}>
        <h2 className={"block-title"}>
          General Info
        </h2>
        { // This is where we populate the block with our data
        Object.entries(this.state.data).map((x, i) => (
          <Grid container className={"kv"} key={i}>
            <Grid item xs={6} className={"kv-key"}>
              <strong >
                {x[0]}
              </strong>
            </Grid>
            <Grid item xs={6} className={"kv-value"}>
              <span>
                {x[1]}
              </span>
            </Grid>
          </Grid>
        )) }
      </div>
    );
  }
  
}


export default GeneralInfo;