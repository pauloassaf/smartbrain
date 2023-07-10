import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png"

const Logo = () => {
    return (
        <div className="center w-10 ma3 mt0">
            <Tilt> 
                <div className="bg-white-70 f3 white br4 pv2">
                    <img alt="logo" src={brain} />
                </div>
            </Tilt>
        </div>
     );
}

export default Logo;