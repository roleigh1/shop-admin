
import React from "react";
import PropTypes from "prop-types"; 
import "../../style.css"
export default function BackgroundInset({children}) {
    return ( 
        <div >
            <div className="backgroundInsert bg-[#ebeceb] rounded-lg w-[20rem] h-[37rem]">
            {children}
            </div>
         </div>
    )
}
BackgroundInset.propTypes = {
    children: PropTypes.node.isRequired,
  };
    