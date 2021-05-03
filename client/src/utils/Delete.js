import React from "react";
import { FaTimes } from "react-icons/fa";

function Delete() {
  return (
    <div style={{ color: "var(--clr-red-2)", paddingTop: "10px" }}>
      <h4>
        <FaTimes />
      </h4>
    </div>
  );
}

export default Delete;
