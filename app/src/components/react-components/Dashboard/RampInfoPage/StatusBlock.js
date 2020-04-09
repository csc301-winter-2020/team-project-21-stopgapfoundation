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
      data:this.props.data,
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
      // status: this.state.data["status"],
      date: this.state.data["date_created"],
      isLoaded: true,
      status: new_progress,
      statusInput: new_progress
    });
  }

  handle(){
    const data = this.state.data
    
		const token = localStorage.getItem('token-access')
    const requestOptions = {
          method: 'POST',
          headers: {
				      'Content-Type': 'application/json',
				      'Authorization': 'Bearer ' + token
		      },
          body: JSON.stringify(data)
    };
    // const link =  '/order-information/' + data["pk"]
    const link =  '/order-information/' 
    fetch(link, requestOptions)
          .then(async response => {
          const data = await response.json();
    
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
				    //  console.log(data.pk)
            // this.setState({ postId: data.pk })
    })
    .catch(error => {
        this.setState({ errorMessage: error });
        console.error('There was an error!', error);
    }); 

  }

  saveData = e => {
    e.preventDefault();
    // TODO: make post request
    const new_status = this.state.statusInput;
    var data = this.state.data
    data["status"] = this.statuses[new_status]
    this.setState({
      status:new_status,
      data:data
    })
    this.handle()
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