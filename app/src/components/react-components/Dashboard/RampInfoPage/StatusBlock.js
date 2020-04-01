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
      "Out for Delivery",
      "Completed"
    ];
    this.statuses[-1] = "--"

    this.state = {
      error: null,
      isLoaded: false,
      date:"",
      statusInput: 0,
      status: -1
      // progress: (0 / (this.statuses.length - 1)) * 100,
    };
  }  

  handleStatusInput = e => {
    this.setState({
      statusInput: this.statuses.indexOf(e.target.value)
    });
  }

  componentDidMount() {
    let new_progress = "status" in this.props.data ? this.statuses.indexOf(this.props.data["status"]) : -1
    if (new_progress >= this.statuses.length || new_progress < -1){
      new_progress = -1;
    }
    this.setState({
      status: this.props.data["status"],
      date: this.props.data["date_created"],
      isLoaded: true,
      status: new_progress,
      statusInput: new_progress
    });
  }

  saveData = e => {
    e.preventDefault();
    // TODO: make post request
    const status = this.state.statusInput;
    this.setState({
      status
    })
  }

  render() {
    const { status, statusInput, date, error, isLoaded } = this.state;
    const statusMsg = this.statuses[statusInput];
    const progress = (statusInput / (this.statuses.length - 1));
    if (error) {
      return <div> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>
    }
    else{

    const dirtyBit = statusInput != status;

    return (
      <div className={"block"}>
        <h2 className={"block-title"}>
          Status
        </h2>
        <span className={"status-block-last-updated"}>
          Initial Request Date: <strong>
            {date}
          </strong>
        </span>
        <ProgressBar progress={progress} />
        <span className={"status-block-status"} > 
          {statusMsg}
          <br/>
        </span>
        { this.props.isAdmin &&
          <Grid container>
            <Grid item md={10}>
              <Select
                className = {"status-bar-textfield"}
                value={statusMsg}
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
}

export default StatusBlock;