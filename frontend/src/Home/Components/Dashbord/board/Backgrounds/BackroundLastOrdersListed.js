import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";

export default function BackgroundLastOrdersListed({ children }) {
  return (
    <div className="bg-gray-200 w-[50vw] h-[20rem] mt-6 rounded-tr-md">
      {children}
    </div>
  );
}

BackgroundLastOrdersListed.propTypes = {
  children: PropTypes.node.isRequired,
};
