import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 
export default function BackgroundBanner({ children }) {
  return (
    <div>
      <div
        className=" backgroundBanner -mt-[13.5rem] bg-[#ebeceb]  w-[15rem] h-[40rem] rounded-tl-lg rounded-bl-lg "
       
      >
        {children}
      </div>
    </div>
  );
}
BackgroundBanner.propTypes = {
  children: PropTypes.node.isRequired,
};
