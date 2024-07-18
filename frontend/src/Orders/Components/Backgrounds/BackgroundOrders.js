import React from "react";
import PropTypes from "prop-types";

export default function BackgroundOrders({ children }) {
  return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="bg-gray-200 rounded-lg p-4 flex justify-center">
        {children}
      </div>
    </div>
  );
}

BackgroundOrders.propTypes = {
  children: PropTypes.node.isRequired,
};
