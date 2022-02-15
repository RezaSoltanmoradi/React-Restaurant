import React from "react";
import styles from "./Button.module.scss";
const Button = ({ className, onClick, children, disabled, type }) => {
    console.log("button RUNNING...");
    return (
        <button
            type={type || 'button'}
            className={`${className} ${styles.button}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default React.memo(Button);
