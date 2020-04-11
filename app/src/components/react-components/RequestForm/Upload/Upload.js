import React from "react";
import ImageUploader from "react-images-upload";
import ReactDOM from "react-dom";
import "./style.css";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  async onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });

    var file = picture[0];
    const form = new FormData();
    form.append('file', file)
    form.append('upload_preset', process.env.REACT_APP_CLOUD_PRESET)

    const request = new Request(process.env.REACT_APP_CLOUD_URL, {
      method: "POST",
      body: form,
    });

    var response = await fetch(request)
    var data = await response.json()
    this.props.handlePicture(this.props.imageIdentifier, data.url);
  }

  render() {
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            border: "1px solid blue",
            width: 310,
          }}
        >
          <div style={{ marginRight: "15px" }}>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              label=""
              buttonText="Upload Images"
              onChange={(e) => this.onDrop(e)}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
              maxFileSize={9999999}
              fileSizeError=" file size is too big"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Upload />, rootElement);

export default Upload;
