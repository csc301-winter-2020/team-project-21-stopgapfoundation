import React from "react";
import { TextField, Grid, Button } from "@material-ui/core"

class Notes extends React.Component{
  constructor(props){
    super(props);
    var notes;
    try {
      notes = JSON.parse(props.notes)
    } catch {
      notes = []
    }
    this.state = {
      notes: notes,
      newNote: ""
    }
  }

  

  generateNoteColor(author) {
    // Color generated based on author
    // First, hash the author (https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript)
    let hash = 0;
    let i, chr;
    for (i = 0; i < author.length; i++){
      chr = author.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }

    // Then, use hash to generate color (https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript)
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();
    
    const luminence = parseInt(c.slice(0, 2), 16) + parseInt(c.slice(2, 4), 16) + parseInt(c.slice(4, 6), 16)

    return {
      bg: "#" + "00000".substring(0, 6 - c.length) + c,
      text: luminence >= 400 ? "#000000" : "#ffffff"
    };
  }

  

  saveNote = e => {
    e.preventDefault();
     // Send post request

    // fetch(`/order-information/${this.props.data['pk']}/`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token-access')}`
    //   },
    //   body: JSON.stringify({
    //     "notes": JSON.stringify(newNotesArr)
    //   })
    // }).then(res => {
    //   if (res.ok){
    //     return res.json()
    //   }
    //   throw new Error(`Something went wrong with error code ${res.status}`)
    // })
    // .then(res => {
    //   this.setState({
    //     newNote: "",
    //     notes: newNotesArr
    //   });
    // }, err => {
    //   console.error("Unable to update note");
    //   console.error(err);
    // })
  }

  render() {

    const {newNote, notes, dirtyBit} = this.props.noteState

    return (
      <div className={`block fullwidth ${dirtyBit ? "unsaved" : ""}`}>
        <h2 className={"block-title"}>
          Notes
        </h2>
        
        <Grid container>
          <Grid item md={9}>
            <TextField
              value={newNote}
              onChange={this.props.handleNewNoteInput}
              fullWidth
              variant="outlined"
              label="Create a New Note"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={3} className={"horz-padding"}>
            <Button className={"create-bttn"} fullWidth variant="contained" color="primary" disabled={newNote.length == 0} onClick={this.props.saveNote}>
              Create Note
            </Button> 
          </Grid>
        </Grid>

        <div className={"notes-container"}>
          {notes.map((note, i) => <NoteBlock note={note} color={this.generateNoteColor(note.author)} key={i} />)}
        </div>
      </div>
    )
  }
}

/**
 * Component to display a single note.
 * 
 * @prop {object} note - The title, date, author, and note of the given note
 * @prop {string} color - hexadecimal color code for note 
 */
function NoteBlock(props) {
  const {dirtyBit, date, author, note} = props.note;
  return (
    <div className={`note-block ${dirtyBit ? "unsaved" : ""}`} style={{backgroundColor: props.color.bg}}>
      
      <p className="note-block-metadata" style={{color: props.color.text}}>
        <span className="note-block-date">
          {date}
        </span>
        {" by "}
        <span className="note-block-author">
          {author}{dirtyBit && <strong>*</strong>}
        </span>
      </p>
      <p className="note-block-content" style={{color: props.color.text}}> 
        {note}
      </p>
    </div>
  );
}

export default Notes;