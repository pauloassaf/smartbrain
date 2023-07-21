import react from "react";
import "./ImageLinkform.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f4 white center w-50">
                {"This app will try to find a human face in your picture!"}
            </p>
            <div>
                <div className="center"> 
                    <div className="bg-white-20 pa3 br3 center">
                        <input type="text" className="w-60 pv2 f4 ma1" onChange={onInputChange} />
                        <button className="link w-30 grow ph3 pv2 dib white bg-light-purple ma2" onClick={onButtonSubmit}>Detect</button>
                    </div>    
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;