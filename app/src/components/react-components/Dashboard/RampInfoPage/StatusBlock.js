import React from "react";
import ProgressBar from "../ProgressBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Select, MenuItem, InputLabel} from "@material-ui/core";
import { sizing } from '@material-ui/system';

class StatusBlock extends React.Component {

  constructor(props){
    super(props);
    this.statuses = [
      "Request Recieved",
      "Request Accepted",
      "Build Phase",
      "Paint Phase",
      "Out for Delivery"
    ];

    this.state = {
      statusInput: this.statuses[0],
      progress: (0 / (this.statuses.length - 1)) * 100,
      status: this.statuses[0]
    };
  }  

  handleStatusInput = e => {
    this.setState({
      statusInput: e.target.value
    });
  }

  saveData = e => {
    e.preventDefault();
    const status = this.state.statusInput;
    const progress = (this.statuses.indexOf(status) / (this.statuses.length - 1)) * 100
    this.setState({
      progress,
      status
    })
  }

  render() {

    const dirtyBit = this.state.statusInput != this.state.status;

    return (
      <div className={"block"}>
        <h2 className={"block-title"}>
          Status
        </h2>
        <span className={"status-block-last-updated"}>
          Last Updated: <strong>
            {"March 11" /*TODO: get actual date */}
          </strong>
        </span>
        <ProgressBar progress={this.state.progress / 100} />
        <span className={"status-block-status"} > { /* style={{left: `${this.state.progress}%`}} */}
          {this.state.status}
          <br/>
        </span>
        { this.props.isAdmin &&
          <Grid container>
            <Grid item md={10}>
              <Select
                className = {"status-bar-textfield"}
                value={this.state.statusInput}
                onChange={this.handleStatusInput}
                type="number"
                variant="outlined"
              >
                {this.statuses.map((status, i) => <MenuItem value={status} key={i}>{status}</MenuItem>)}
                
              </Select>
            </Grid>

            <Grid item md={2}>
              <Button fullWidth variant="contained" color="primary" disabled={!dirtyBit} onClick={this.saveData}>Save</Button>
            </Grid>
          </Grid>
        }
      </div>
    );
  }
}

export default StatusBlock;