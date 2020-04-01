import React from "react";
import { Button, Grid } from '@material-ui/core';
import RampDimensions from "./RampDimensions";
import StatusBlock from "./StatusBlock";
import Notes from "./Notes";
import GeneralInfo from "./GeneralInfo";
import "../Admin/admin_styles.css"; // TODO: update w/ different css file

/* Primary Component for the Admin Dashboard page */
class RampInfoPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: this.props.id
    }
  }


  render () {

    return (
      <Grid container>
        <Grid item xs={4}>
          <GeneralInfo isAdmin={this.props.isAdmin} data={ this.state.data }/>
        </Grid>
        <Grid item container xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <RampDimensions data={ this.state.data } isAdmin={this.props.isAdmin} />
            </Grid>
            <Grid item xs={6}>
              <StatusBlock isAdmin={this.props.isAdmin} data={ this.state.data } />
            </Grid>
            <Grid item xs={3}>
            <   Button  variant="outlined" id="backButton" onClick={this.props.goBack}>Go Back</Button>
          </Grid>
          </Grid>
          {this.props.isAdmin && <Notes />}
        </Grid>
      </Grid>

    );
  }
}

export default RampInfoPage;
