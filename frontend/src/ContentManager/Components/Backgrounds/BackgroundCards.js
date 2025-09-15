import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 

export default function BackgroundCards({ children }) {
  return (
    <div>
      <div
        className="backgroundCards bg-[#ebeceb] w-[15rem] h-[55rem] rounded-tr-lg rounded-br-lg mt-6"
 
      >
        {children}
      </div>
    </div>    
  );
}
BackgroundCards.propTypes = {
  children: PropTypes.node.isRequired,
};
