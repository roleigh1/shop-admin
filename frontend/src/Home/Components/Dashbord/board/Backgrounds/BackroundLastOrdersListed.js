import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";
export default function BackgroundLastOrdersListed({ children }) {
  return (
    <div>
      <div
        className="backgroundLast bg-[#ebeceb] w-[50vw] h-[20rem] rounded-tr-[10px]"

      >
        {children}
      </div>
    </div>
  );
}
BackgroundLastOrdersListed.propTypes = {
  children: PropTypes.node.isRequired,
};
