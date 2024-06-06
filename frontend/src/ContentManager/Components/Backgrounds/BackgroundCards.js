import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 

export default function BackgroundCards({ children }) {
  return (
    <div>
      <div
        className="backgroundCards"
        style={{
          backgroundColor: "#ebeceb",
          width: "15rem",
          height: "40%",
          borderTopRightRadius: "10px",
          marginTop: "1.5rem",
          borderBottomRightRadius: "10px",
          paddingBottom: "1rem",
        }}
      >
        {children}
      </div>
    </div>    
  );
}
BackgroundCards.propTypes = {
  children: PropTypes.node.isRequired,
};
