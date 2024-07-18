import React from "react";
import PropTypes from "prop-types";
import "../../style.css";
export default function BackgroundModiTable({ children }) {
  return (
    <div>
      <div className="background bg-[#ebeceb] rounded-[10px] w-[62vw] h-[33rem]">
        {children}
      </div>
    </div>
  );
}
BackgroundModiTable.propTypes = {
  children: PropTypes.node.isRequired,
};
