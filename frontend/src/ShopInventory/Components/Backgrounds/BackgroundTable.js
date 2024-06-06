
import React from "react";
import PropTypes from "prop-types"; 
import "../../style.css"
export default function BackgroundModiTable({children}) {
    return ( 
        <div  >
            <div className="background" style={{backgroundColor:"#ebeceb", borderRadius:"10px",width:"62vw",height:"35rem" }}>
            {children}
            </div>
         </div>
    )
}
BackgroundModiTable.propTypes = {
    children: PropTypes.node.isRequired,
  };
    