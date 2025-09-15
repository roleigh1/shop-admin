import React from "react";
import "../style.css";
import PropTypes from "prop-types"; 
export default function BackgroundOrders({ children }) {
  return (
    <div className="background-container">
      <div
        className="background bg-[#ebeceb] rounded-lg h-auto flex justify-center w-[100%]"

      >
        {children}
      </div>
    </div>
  );
}
BackgroundOrders.propTypes = {
  children: PropTypes.node.isRequired,
};