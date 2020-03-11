import React from "react";

class Notes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: [{
        title: "Example Note",
        date: "Mar 11",
        author: "StopGap Team",
        note: "This is an example note that comes with the component, for testing purposes."
      }]
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

    return "#" + "00000".substring(0, 6 - c.length) + c;
  }

  render() {

    return (
      <div className={"block"}>
        {this.state.notes.map((note, i) => <NoteBlock note={note} color={this.generateNoteColor(note.author)} key={i} />)}
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

  console.log(props.color);

  const {title, date, author, note} = props.note;
  return (
    <div className="note-block" style={{backgroundColor: props.color}}>
      <p className="note-block-metadata">
        <span className="note-block-title">
          {title}
        </span>
        <br />
        <span className="note-block-date">
          {date}
        </span>
        {" by "}
        <span className="note-block-author">
          {author}
        </span>
      </p>
      <p className="note-block-content">
        {note}
      </p>
    </div>
  );
}

export default Notes;