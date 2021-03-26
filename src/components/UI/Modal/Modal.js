import React from "react";
import "./Modal.css";

import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop/Backdrop";
const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.shows} clicked={props.modalClose} />
      <div
        className="Modal"
        style={{
          transform: props.shows ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.shows ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
