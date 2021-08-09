import React from "react";
import ReactDom from "react-dom";
import style_classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={style_classes.backdrop} onClick={props.onHide} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={style_classes.modal}>
      <div className={style_classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");

  return (
    <React.Fragment>
      {/* <Backdrop />
      <ModalOverlay /> */}
      {ReactDom.createPortal(<Backdrop onHide={props.onHide} />, portalElement)}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
