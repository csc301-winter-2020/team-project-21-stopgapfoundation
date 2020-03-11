import React from "react";
import ProgressBar from "../ProgressBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { sizing } from '@material-ui/system';

class StatusBlock extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      progressInput: "",
      statusInput: "",
      progress: 20,
      status: "Build Phase"
    };
  }

  handleStatusInput = e => {
    this.setState({
      statusInput: e.target.value
    });
  }

  handleProgressInput = e => {
    this.setState({
      progressInput: e.target.value
    });
  }

  saveData = e => {
    e.preventDefault();
    const progress = parseInt(this.state.progressInput);
    const status = this.state.statusInput;
    this.setState({
      progress,
      status
    })
  }

  render() {

    const dirtyBit = this.state.progressInput.length > 0 || this.state.statusInput.length > 0;

    return (
      <div className={"block"}>
        <ProgressBar progress={this.state.progress / 100} />
        <span className={"status-block-status"} style={{left: `${this.state.progress}%`}}>
          {this.state.status}
        </span>
        <Grid container>
          <Grid item md={5}>
            <TextField
              className = {"status-bar-textfield"}
              value={this.state.progressInput}
              onChange={this.handleProgressInput}
              placeholder={this.state.progress.toString()}
              label="Progress"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            %
          </Grid>

          <Grid item md={5}>
            <TextField
              className = {"status-bar-textfield"}
              value={this.state.statusInput}
              onChange={this.handleStatusInput}
              placeholder={this.state.status}
              label="Status"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item md={2}>
            <Button fullWidth variant="contained" color="primary" disabled={!dirtyBit} onClick={this.saveData}>Save</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StatusBlock;