import React from "react";
import { Button, Grid } from '@material-ui/core';
import RampDimensions from "./RampDimensions";
import StatusBlock from "./StatusBlock";
import Notes from "./Notes";
import GeneralInfo from "./GeneralInfo";
import "../Admin/admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class RampInfoPage extends React.Component {



  constructor(props){
    super(props);
    this.state = {
      newNote: "",
      notes: []
    }
  }

  // We place states here so that there is simply ONE universal save button
  handleNewNoteInput = e => {
    e.preventDefault();
    this.setState({
      newNote: e.target.value
    });
  }

  saveNote = e => {
    e.preventDefault();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "December"
    ];

    const now = new Date();
    const date = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const note = this.state.newNote;
    const newNotesArr = [...this.state.notes];
    newNotesArr.push({
      date: date,
      author: "user", // TODO: update
      note: note,
      dirtyBit: true
    });
    this.setState({
      notes: newNotesArr,
      newNote: ""
    })
  }

  render () {
    const {data} = this.props;

    return (
      <Grid container>
        <Grid item xs={4}>
          <GeneralInfo isAdmin={this.props.isAdmin} data={ data }/>
        </Grid>
        <Grid item container xs={8}>
          <Grid container>
            <Grid item xs={6}>
              <RampDimensions data={ data } isAdmin={this.props.isAdmin} />
            </Grid>
            <Grid item xs={6}>
              <StatusBlock isAdmin={this.props.isAdmin} data={ data } />
            </Grid>
          </Grid>
          {this.props.isAdmin 
            && <Notes notes={this.state.notes} newNote={this.state.newNote} saveNote={this.saveNote} handleNewNoteInput={this.handleNewNoteInput}/>}
        </Grid>
        {this.props.isAdmin && 
          <Button fullWidth variant="contained" color="primary" >
            Save
          </Button>
        }
      </Grid>

    );
  }
}

export default RampInfoPage;
