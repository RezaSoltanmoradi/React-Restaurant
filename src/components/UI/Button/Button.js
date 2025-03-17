import { memo } from "react";
import styles from "./Button.module.scss";
const Button = ({ className, children, type, ...props }) => {
  return (
    <button
      type={type || "button"}
      className={`${className} ${styles.button}`}
      {...props} // onClick , disabled
    >
      {children}
    </button>
  );
};
export default memo(Button);
