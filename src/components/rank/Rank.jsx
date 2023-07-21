import React from "react";


const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="white f4 center">
            {`${name}, your number of submits is ${entries}.`}
            </div>
        </div>
     )
}

export default Rank;