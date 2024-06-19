import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function Alert( {showAlert, msg} ) {
  return (
      <div className="alert-wrapper vh100 position-absolute" style={{ bottom: showAlert ? "0" : "10%" }}>
        <div
          className="alert px-3 py-2 mt-2">
          <FontAwesomeIcon icon={faCircleExclamation} className="me-3" />
          <b> {msg} </b>
        </div>
      </div>
  );
}