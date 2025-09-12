import "../../../../home.css";
import React from "react";
import PropTypes from "prop-types";
export default function Background({ children }) {
  return (
    <div>
      <div
        className="background1 bg-[#ebeceb] w-[20rem] h-[20rem] rounded-tl-[10px]"
   
      >
        {children}
      </div>
    </div>
  );
}
Background.propTypes = {
  children: PropTypes.node.isRequired,
};
