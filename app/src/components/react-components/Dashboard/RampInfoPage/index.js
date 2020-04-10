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
      noteState: {
        newNote: "",
        notes: [],
        dirtyBit: false
      },
      statusState: {
        statusInput: 0,
        status: -1,
        dirtyBit: false
      },
      infoState: {
        dirtyBit: false
      }
    }
  }

  overallDirtyBit = () => {
    const states = [this.state.noteState, this.state.statusState, this.state.infoState];
    return states.some(x => x.dirtyBit)
  }

  // We place states here so that there is simply ONE universal save button
  handleNewNoteInput = e => {
    e.preventDefault();
    // make a copy of the note state, and then update the newNote property
    const noteStateCopy = {}
    Object.assign(noteStateCopy, this.state.noteState)
    noteStateCopy.newNote = e.target.value
    // Save the note state
    this.setState({
      noteState: noteStateCopy 
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

    const noteStateCopy = {};
    Object.assign(noteStateCopy, this.state.noteState);
    noteStateCopy.newNote = "";
    noteStateCopy.notes.push({
      date: date,
      author: "user", // TODO: update
      note: note,
      dirtyBit: true
    });
    noteStateCopy.dirtyBit = true;
    this.setState({
      noteState: noteStateCopy
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
              <StatusBlock isAdmin={this.props.isAdmin} data={ data } statusState={this.state.statusState} />
            </Grid>
          </Grid>
          {this.props.isAdmin 
            && <Notes noteState={this.state.noteState} saveNote={this.saveNote} handleNewNoteInput={this.handleNewNoteInput}/>}
        </Grid>
        {this.props.isAdmin && 
          <Button fullWidth variant="contained" color="primary" disabled={!this.overallDirtyBit()} >
            Save
          </Button>
        }
      </Grid>

    );
  }
}

export default RampInfoPage;
