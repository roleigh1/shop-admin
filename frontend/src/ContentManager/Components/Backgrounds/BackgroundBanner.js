import "./backgrounds.css";
import React from "react";
export default function BackgroundBanner({ children }) {
  return (
    <div>
      <div
        className="backgroundBanner"
        style={{
          backgroundColor: "#ebeceb",
          width: "100%",
          height: "28rem",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          marginTop: "1.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}
