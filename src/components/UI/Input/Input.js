import styles from "./input.module.scss";
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { label, input } = props;
  return (
    <div className={styles.input}>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} className="text-center" />
    </div>
  );
});
export default Input;
