import React from "react";
import "./FaceRecognition.css"


const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma2"> 
            <div className="absolute mt3">
                <img id="inputImage" alt="" src={imageUrl} width="600" heigh="auto" />
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow }} />
            </div>
        </div>
     );
}

export default FaceRecognition;
