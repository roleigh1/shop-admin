import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 

export default function BackgroundCards({ children }) {
  return (
    <div>
      <div className="backgroundCards bg-[#ebeceb] w-60 h-[40%] rounded-tr-lg rounded-br-lg mt-6 pb-4">
        {children}
      </div>
    </div>    
  );
}

BackgroundCards.propTypes = {
  children: PropTypes.node.isRequired,
};