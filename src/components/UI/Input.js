import styles from "./input.module.scss";
import React, { forwardRef } from "react";

// forward ref from MealItemForm() component
const Input = forwardRef((props, ref) => {
    return (
        <div className={styles.input}>
            <input ref={ref} {...props.input} className="text-center" />
            <label htmlFor={props.input.id}>{props.label}</label>
        </div>
    );
});
export default Input;
