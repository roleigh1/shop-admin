import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";

export default function BackgroundMostlyBuyed({ children }) {
  return (
    <div className="bg-gray-200 w-[65rem] h-[22rem] rounded-bl-md rounded-br-md flex flex-row items-center justify-center">
      {children}
    </div>
  );
}

BackgroundMostlyBuyed.propTypes = {
  children: PropTypes.node.isRequired,
};
