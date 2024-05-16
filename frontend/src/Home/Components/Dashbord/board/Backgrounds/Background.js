import "../../../../home.css";
import React from "react";

export default function Background({ children }) {
  return (
    <div>
      <div
        className="background1"
        style={{
          backgroundColor: "#ebeceb",
          width: "20rem",
          height: "20rem",
          borderTopLeftRadius: "10px",
          marginTop: "1.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}
