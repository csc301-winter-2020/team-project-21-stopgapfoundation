import React from "react";
import {Select, MenuItem, TextField, InputLabel, Button} from "@material-ui/core";

/**
 * Component to display general info about a ramp request
 *
 * @prop {boolean} isAdmin - When true, admin-specific functionality will appear
**/
class GeneralInfo extends React.Component {

  constructor(props) {
    super(props);
    const {data} = props;
    this.state = {
      data: { // default data
        "Ramp #": {
          value: data["pk"],
          options: [],
          clientEditable: false, // TODO: make editable
          adminEditable: false,
        },
        "Client Name": {
          value: `${data["first_name"]} ${data["last_name"]}`,
          options: [],
          clientEditable: false,
          adminEditable: false,
        },
        "Delivery Address": {
          value: data["shipping_address"],
          options: [],
          clientEditable: false,
          adminEditable: false,
        },
        "Billing Address": {
          value: data["billing_address"],
          options: [],
          clientEditable: false,
          adminEditable: false,
        },
        // "Liability Waiver": { 
        //   value: "",
        //   options: ["Not Signed", "Signed"],
        //   link: "", //exlusive to liability waiver
        //   clientEditable: false,
        //   adminEditable: false,
        // },
        "Subsidy Info": {
          value: data["subsidize"] ? "Subsidized" : "Not Subsidized",
          options: ["Subsidized", "Not Subsidized"],
          clientEditable: false,
          adminEditable: false,
        },
      }
    };
  }

  render() {
    const dataCopy = {...this.state.data};
    const {dirtyBit} = this.props.infoState;
    
    return (
      <div className={`block ${dirtyBit ? "unsaved" : ""}`}>
        <h2 className={"block-title"}>
          General Info
        </h2>
        <div className={"general-info-container"}>
          { // This is where we populate the block with our data
            Object.entries(this.state.data).map((x, i) => {
              const key = x[0];
              const {value, options, clientEditable, adminEditable} = x[1];
              const editable = (this.props.isAdmin && adminEditable) || (!this.props.isAdmin && clientEditable)

              return (
                <div>
                  <InputLabel id={`geninfo-select-${i}`} shrink>
                    {`${key}${!editable ? " (Read-Only)" : ""}`}
                  </InputLabel>
                  {options.length > 0 ? 
                    (
                        <Select
                          className={"general-info-input"}
                          labelId={`geninfo-select-${i}`}
                          key={i}
                          defaultValue={value}
                          fullWidth
                          type="text"
                          variant={editable ? "outlined" : "standard"}
                          InputProps={{
                            readOnly: !editable
                          }}
                        >
                          {
                            options.map(opt => (editable || opt == value) ? <MenuItem value={opt}>{opt}</MenuItem> : null)
                          }
                        </Select>
                    ) : (
                      <TextField
                        className={"general-info-input"}
                        labelId={`geninfo-select-${i}`}
                        key={i}
                        defaultValue={value}
                        fullWidth
                        type="text"
                        variant={editable ? "outlined" : "standard"}
                        InputProps={{
                          readOnly: !editable
                        }}
                      />
                    )
                  }
                </div>
              )
            })
          }
        </div>
        {/* // TODO: add back in, im just tired right now. */}
        {/* <Button fullWidth variant="contained" color="primary" >Save</Button> */}
      </div>
    );  
  }
}


export default GeneralInfo;