// PdfComponent.js
import React from "react";

export const PdfComponent = React.forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <h1 style={{color: "black"}}>This is React PDF</h1>
    </div>
  );
});
