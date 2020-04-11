import React from "react";
import { Grid } from "@material-ui/core"; 

class PhotoGallery extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {dirtyBit, leftSrc, entrySrc, rightSrc} = this.props.galleryState;
    return (
      <div className={`block ${dirtyBit ? "unsaved" : ""}`}>
        <h2 className={"block-title"}>
          Photo Gallery
        </h2>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <h3 className={"center-text"}>
              Left Step Photo
            </h3>
            <img alt="left-step-photo" src={leftSrc} className={"center-block"} />
          </Grid>
          <Grid item xs={12} md={4}>
            <h3 className={"center-text"}>
              Entryway Photo
            </h3>
            <img alt="left-step-photo" src={entrySrc} className={"center-block"} />
          </Grid>
          <Grid item xs={12} md={4}>
            <h3 className={"center-text"}>
              Right Step Photo
            </h3>
            <img alt="left-step-photo" src={rightSrc} className={"center-block"} />
          </Grid>

        </Grid>
      </div>
    )
  }
}

export default PhotoGallery;