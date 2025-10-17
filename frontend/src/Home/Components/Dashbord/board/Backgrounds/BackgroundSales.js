import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";
export default function BackgroundMostlyBuyed({ children }) {
  return (
    <div
      className="backgroundSales bg-[#ebeceb] w-[63.4rem] h-[22rem] rounded-bl-[10px] rounded-br-[10px] flex flex-row items-center justify-center mb-5"

    >
      {children}
    </div>
  );
}
BackgroundMostlyBuyed.propTypes = {
  children: PropTypes.node.isRequired,
};
