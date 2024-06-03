import React from "react";
import "../style.css";
import PropTypes from "prop-types"; 
export default function BackgroundOrders({ children }) {
  return (
    <div className="background-container">
      <div
        className="background"
        style={{
          backgroundColor: "#ebeceb",
          borderRadius: "10px",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
BackgroundOrders.propTypes = {
  children: PropTypes.node.isRequired,
};