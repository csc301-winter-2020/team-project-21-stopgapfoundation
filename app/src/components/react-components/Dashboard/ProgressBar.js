import React from "react";

/**
 * Progress bar that can be set to any percent.
 * 
 * @prop {float} progress - a float from 0 to 1 determining the progress of the 
 */
function ProgressBar(props){
    return (
        <div className="progress-bar">
            <div className="progress-bar-inner" style={{width: `${props.progress * 100}%`}}></div>
        </div>
    );
}

export default ProgressBar;