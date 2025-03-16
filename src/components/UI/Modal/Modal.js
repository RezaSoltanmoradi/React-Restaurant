import React, { memo, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

const ModalOverlays = ({ children, width, loading }) => {

  const { userData } = useContext(AuthContext);
  const { items } = userData.checkout;
  const modalStyle =
    items?.length > 0 && !loading ? styles.validModal : styles.inValidModal;
  return (
    <div className={`${modalStyle} ${styles.modal}`} style={{ width }}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, width, loading }) => {
  const { hideCardItems, cardIsShown } = useContext(CartContext);

  return (
    cardIsShown && (
      <>
        {createPortal(<Backdrop onClose={hideCardItems} />, portalElement)}
        {createPortal(
          <ModalOverlays width={width} loading={loading}>
            {children}
          </ModalOverlays>,
          portalElement
        )}
      </>
    )
  );
};

export default memo(Modal);
