import "./backgrounds.css";
import React from "react";
import PropTypes from "prop-types"; 

export default function BackgroundBanner({ children }) {
  return (
    <div>
      <div className="backgroundBanner bg-[#ebeceb] w-60 h-[40rem] rounded-tl-lg rounded-bl-lg mt-6">
        {children}
      </div>
    </div>
  );
}

BackgroundBanner.propTypes = {
  children: PropTypes.node.isRequired,
};