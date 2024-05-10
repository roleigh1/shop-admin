
import React from "react";
import "../../style.css"
export default function BackgroundInset({children}) {
    return ( 
        <div >
            <div className="backgroundInsert" style={{backgroundColor:"#ebeceb", borderRadius:"10px",width:"20rem",height:"32rem" }}>
            {children}
            </div>
         </div>
    )
}