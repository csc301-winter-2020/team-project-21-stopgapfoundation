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

    this.state = {
    error: null,
    isLoaded: false,
    date:"",
    // statusInput: this.statuses[3],
    // progress: (3 / (this.statuses.length - 1)) * 100,
    // status: this.statuses[3]
    progress: (0 / (this.statuses.length - 1)) * 100,
    status: ""
    };
  }  

  // handleStatusInput = e => {
  //   this.setState({
  //     statusInput: e.target.value
  //   });
  // }

  componentDidMount() {
    fetch("/order-information/")
      .then(res => res.json())
      .then(
        (result) => {
          const orders = this.props.data

          const new_progress = (this.statuses.indexOf(orders["status"]) / (this.statuses.length - 1)) * 100
          this.setState({
            status: orders["status"],
            date: orders["date_created"],
            isLoaded: true,
            progress:new_progress
            
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // saveData = e => {
  //   e.preventDefault();
  //   const status = this.state.statusInput;
  //   const progress = (this.statuses.indexOf(status) / (this.statuses.length - 1)) * 100
  //   this.setState({
  //     progress,
  //     status
  //   })
  // }

  render() {
    const { listings, error, isLoaded } = this.state;
    if (error) {
      return <div> Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <div>Loading...</div>
    }
    else{

    const dirtyBit = this.state.statusInput != this.state.status;

    return (
      <div className={"block"}>
        <h2 className={"block-title"}>
          Status
        </h2>
        <span className={"status-block-last-updated"}>
          Date Created: <strong>
            {this.state.date}
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
}

export default StatusBlock;