import React from "react";
import "../../../../home.css"
export default function BackgroundLastOrdersListed
({children}) {
    return ( 
        <div  >
            <div className="backgroundLast" style={{backgroundColor:"#ebeceb",width:"50vw",height:"20rem", borderTopRightRadius:"10px"}}>
                {children}
            </div>
         </div>
    )
}