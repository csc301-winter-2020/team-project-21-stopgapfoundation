import React from 'react';
import ImageUploader from 'react-images-upload';
import ReactDOM from "react-dom";
import "./style.css";

class Upload extends React.Component {

  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop (picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }
  render () {
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            border: "1px solid blue",
            width: 310

          }}
        >
          <div style={{ marginRight: "15px" }}>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              label=""
              buttonText="Upload Images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
              maxFileSize={1048576}
              fileSizeError=" file size is too big"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >


          </div>
        </div>
      </div>
    );
  }

}



const rootElement = document.getElementById("root");
ReactDOM.render(<Upload />, rootElement);

export default Upload