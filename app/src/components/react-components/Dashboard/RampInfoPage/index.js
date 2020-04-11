import React from "react";
import { Button, Grid } from '@material-ui/core';
import RampDimensions from "./RampDimensions";
import StatusBlock from "./StatusBlock";
import Notes from "./Notes";
import GeneralInfo from "./GeneralInfo";
import PhotoGallery from "./PhotoGallery";
import "../Admin/admin_styles.css";

/* Primary Component for the Admin Dashboard page */
class RampInfoPage extends React.Component {

  constructor(props){
    super(props);

    // let new_progress = "status" in props.data ? this.statuses.indexOf(props.data["status"]) : -1
    // if (new_progress >= this.statuses.length || new_progress < -1){
    //   new_progress = -1;
    // }

    this.state = {
      noteState: {
        newNote: "",
        notes: JSON.parse(props.data["notes"]).map(x => ({ ...x, dirtyBit: false})),
        dirtyBit: false
      },
      statusState: {
        statusInput: parseInt(props.data["status"]),  // This is what will be posted when "save changes" is pressed.
        oldStatus: parseInt(props.data["status"]),
        dirtyBit: false
      },
      infoState: {
        dirtyBit: false
      },
      galleryState: {
        dirtyBit: false,
        leftSrc: props.data["step_left_photo"],
        entrySrc: props.data["entryway_photo"],
        rightSrc: props.data["step_right_photo"]
      }
    }
  }

  overallDirtyBit = () => {
    const states = [this.state.noteState, this.state.statusState, this.state.infoState];
    return states.some(x => x.dirtyBit)
  }

  saveChanges = e => {
    e.preventDefault();
    const newOrder = {};
    Object.assign(newOrder, this.props.data);

    if (this.state.noteState.dirtyBit){
      const serializedNotes = this.state.noteState.notes.map(note => ({
        date: note.date,
        author: note.author,
        note: note.note
      }));
      newOrder["notes"] = JSON.stringify(serializedNotes);
    }
    if (this.state.statusState.dirtyBit){
      newOrder["status"] = JSON.stringify(this.state.statusState.statusInput);
    }
    // TODO: general info

    this.props.verifyTokens().then(valid => {
      if (!valid)
        return;
      fetch(`/order-information/${newOrder["pk"]}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token-access')}`   
        },
        body: JSON.stringify(newOrder)
      })
      .then (res => {
        res.json();
      })
      .then (res => {
        console.log(res);
        // TODO: update dirty bits
        const noteStateCopy = {}
        Object.assign(noteStateCopy, this.state.noteState)
        noteStateCopy.dirtyBit = false;
  
        const statusStateCopy = {}
        Object.assign(statusStateCopy, this.state.statusState)
        statusStateCopy.dirtyBit = false;
  
        const infoStateCopy = {}
        Object.assign(infoStateCopy, this.state.infoState)
        infoStateCopy.dirtyBit = false;
  
        this.setState({
          noteState: noteStateCopy,
          statusState: statusStateCopy,
          infoState: infoStateCopy
        })
      })
      .catch(err => {
        console.error("there was an error with saving changes!", err);
      })
    });
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
    const note = this.state.noteState.newNote;

    const noteStateCopy = {};
    Object.assign(noteStateCopy, this.state.noteState);
    noteStateCopy.newNote = "";
    noteStateCopy.notes.push({
      date: date,
      author: localStorage.getItem("username"), // TODO: update
      note: note,
      dirtyBit: true
    });
    noteStateCopy.dirtyBit = true;
    this.setState({
      noteState: noteStateCopy
    })
  }

  handleStatusInput = status => {
    const statusStateCopy = {};
    Object.assign(statusStateCopy, this.state.statusState);

    statusStateCopy.statusInput = status;
    statusStateCopy.dirtyBit = statusStateCopy.statusInput != statusStateCopy.oldStatus; // Remains as such until the entire dash's changes are saved.
    this.setState({
      statusState: statusStateCopy
    });
  }

  render () {
    const {data, isAdmin} = this.props;

    return (
      <div>
        <Grid container>
          <Grid item xs={4}>
            <GeneralInfo isAdmin={isAdmin} data={ data } infoState={this.state.infoState}/>
          </Grid>
          <Grid item container xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <RampDimensions data={ data } isAdmin={isAdmin} />
              </Grid>
              <Grid item xs={6}>
                <StatusBlock isAdmin={isAdmin} statusState={this.state.statusState} date={data["date_created"]} handleStatusInput={this.handleStatusInput}/>
              </Grid>
            </Grid>
            {isAdmin 
              && <Notes noteState={this.state.noteState} saveNote={this.saveNote} handleNewNoteInput={this.handleNewNoteInput}/>}
          </Grid>
        </Grid>
        <PhotoGallery galleryState={this.state.galleryState}/>
        {isAdmin && 
          <Button fullWidth variant="contained" color="primary" disabled={!this.overallDirtyBit()} onClick={this.saveChanges} >
            Save
          </Button>
        }
      </div>
    );
  }
}

export default RampInfoPage;
