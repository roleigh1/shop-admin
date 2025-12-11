import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";
export default function BackgroundMostlyBuyed({ children }) {
  return (
    <div
      className="backgroundSales bg-[#ebeceb] w-[50em] h-[22rem] rounded-bl-[10px] rounded-br-[10px]  mb-5"

    >
      {children}
    </div>
  );
}
