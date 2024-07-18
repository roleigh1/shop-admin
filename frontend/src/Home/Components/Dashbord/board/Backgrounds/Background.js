import React from "react";
import PropTypes from "prop-types";
import "../../../../home.css";

export default function Background({ children }) {
  return (
    <div>
      <div className="bg-gray-200 w-80 h-80 rounded-tl-md mt-6">{children}</div>
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
};
