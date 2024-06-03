import React from "react";
import "../../../../home.css";
import PropTypes from "prop-types";
export default function BackgroundMostlyBuyed({ children }) {
  return (
    <div
      className="backgroundSales"
      style={{
        backgroundColor: "#ebeceb",
        width: "65rem",
        height: "22rem",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}
BackgroundMostlyBuyed.propTypes = {
  children: PropTypes.node.isRequired,
};
