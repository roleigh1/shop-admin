
import React from "react";
import "../../style.css"
export default function BackgroundModiTable({children}) {
    return ( 
        <div className="background" >
            <div className="backgroundModify" style={{backgroundColor:"#ebeceb", borderRadius:"10px",width:"80vw",height:"10rem",display:"flex", justifyContent:"center" }}>
            {children}
            </div>
         </div>
    )
}