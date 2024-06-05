import React from "react";

function Weather() {
  return (
    <div className="output bottom-container">
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "5rem",
          wordSpacing: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingLeft: "30px",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Enter city</span>
          <span>📍</span>
        </div>
      </h1>
    </div>
  );
}

export default Weather;
