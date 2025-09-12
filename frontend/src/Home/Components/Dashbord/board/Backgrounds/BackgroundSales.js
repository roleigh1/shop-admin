import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";
export default function BackgroundMostlyBuyed({ children }) {
  return (
    <div
      className="backgroundSales bg-[#ebeceb] w-[65rem] h-[22rem] rounded-tl-[10px] rounded-tr-[10px] flex flex-row items-center justify-center"

    >
      {children}
    </div>
  );
}
BackgroundMostlyBuyed.propTypes = {
  children: PropTypes.node.isRequired,
};
