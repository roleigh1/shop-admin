import React from "react";
import "../../../../home.css";
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
