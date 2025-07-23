
import React from "react";
import PropTypes from "prop-types"; 
import "../../style.css"
export default function BackgroundInset({children}) {
    return ( 
        <div >
            <div className="backgroundInsert" style={{backgroundColor:"#ebeceb", borderRadius:"10px",width:"20rem",height:"37rem" }}>
            {children}
            </div>
         </div>
    )
}
BackgroundInset.propTypes = {
    children: PropTypes.node.isRequired,
  };
    