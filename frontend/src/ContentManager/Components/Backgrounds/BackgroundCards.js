import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 

export default function BackgroundCards({ children }) {
  return (
    <div>
      <div
        className="backgroundCards bg-[#ebeceb] w-[15rem] h-[100%] rounded-tr-lg rounded-br-lg pb-5 mb-5"
 
      >
        {children}
      </div>
    </div>    
  );
}
BackgroundCards.propTypes = {
  children: PropTypes.node.isRequired,
};
