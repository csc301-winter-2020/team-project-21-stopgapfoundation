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
    this.state = {
      data: { // default data
        "Ramp #": {
          value: "",
          options: [],
          clientEditable: false,
          adminEditable: true,
        },
        "Project #": {
          value: "",
          options: [],
          clientEditable: false,
          adminEditable: true,
        },
        "Client Name": {
          value: "John Smith",
          options: [],
          clientEditable: true,
          adminEditable: false,
        },
        "Business Name": {
          value: "Regular Business Inc.",
          options: [],
          clientEditable: true,
          adminEditable: false,
        },
        "Nickname": {
          value: "Regular Business Inc.",
          options: [],
          clientEditable: true,
          adminEditable: true,
        },
        "Delivery Address": {
          value: "123 Street Road, Toronto, ON",
          options: [],
          clientEditable: true,
          adminEditable: true,
        },
        "Billing Address": {
          value: "4567 Boulavard Lane, Toronto, ON",
          options: [],
          clientEditable: true,
          adminEditable: true,
        },
        "Liability Waiver": {
          value: "Not Signed",
          options: ["Not Signed", "Signed"],
          link: "", //exlusive to liability waiver
          clientEditable: false,
          adminEditable: true,
        },
        "Subsidy Info": {
          value: "No subsidies",
          options: [],
          clientEditable: false,
          adminEditable: true,
        }
      }
    };
  }

  componentDidMount() {
    console.log(this.state);
    // TODO: this will retrieve data from backend to update the frontend
    this.setState({
      
    })
  }

  render() {
    return (
      <div className={"block"}>
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
                    {key}
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
                            options.map(opt => <MenuItem value={opt}>{opt}</MenuItem>)
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
        <Button fullWidth variant="contained" color="primary" >Save</Button>
      </div>
    );
  }
  
}


export default GeneralInfo;