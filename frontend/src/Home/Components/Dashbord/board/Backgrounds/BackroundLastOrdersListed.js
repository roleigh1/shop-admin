import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types"; 
export default function BackgroundLastOrdersListed({ children }) {
  return (
    <div>
      <div
        className="backgroundLast"
        style={{
          backgroundColor: "#ebeceb",
          width: "50vw",
          height: "20rem",
          borderTopRightRadius: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
BackgroundLastOrdersListed.propTypes = {
  children: PropTypes.node.isRequired,
};
