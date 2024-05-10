import "./backgrounds.css"; 
import React from "react";

export default function BackgroundBanner({children}) {
    return ( 
        <div  >
            <div className="background1" style={{backgroundColor:"#ebeceb", width:"30rem",height:"28rem", borderTopLeftRadius:"10px",  borderBottomLeftRadius:"10px",marginTop:"1.5rem" }}>
            {children}
            </div>
         </div>
    )
}