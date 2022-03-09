import React, { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import MainContext from "../context/MainContext";
import styles from "./Modal.module.scss";


const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlays = (props) => {
    const context=useContext(MainContext);
    const {items}=context;

    return (
        <div className={items.length===0? styles.inValid: styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
    const context = useContext(MainContext);
    const { hideCardItems } = context;
    return (
        <Fragment>
            {createPortal(<Backdrop onClose={hideCardItems} />, portalElement)}
            {createPortal(
                <ModalOverlays>{props.children}</ModalOverlays>,
                portalElement
            )}
        </Fragment>
    );
};
export default Modal;
