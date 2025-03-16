import React, { useRef, useImperativeHandle, forwardRef } from "react";

import classes from "./input.module.scss";
const Input = forwardRef(
  ({ label, id, errorMessage, isValid, ...props }, ref) => {
    const inputRef = useRef();
    const activate = () => {
      inputRef.current.focus();
    };
    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    const serchErrorMessage = (id) => {
      const labelObj = {
        USERNAME: "Username must be at least 4 characters long.",
        EMAIL: "Email must include '@gmail.com'.",
        PASSWORD:
          "Password must be at least 8 characters and include uppercase, lowercase, and a number.",
      };
      return labelObj[id?.toUpperCase()] || "";
    };

    const message = serchErrorMessage(id);
    return (
      <div>
        <div
          className={`${classes.control} ${
            isValid === false ? classes.invalid : ""
          }`}
        >
          <label className="pb-1 pb-md-0" htmlFor={id}>
            {label}:
          </label>
          <input ref={inputRef} id={id} {...props} autoComplete={id} />
        </div>
        <p className={classes.content}>{!isValid && message}</p>
      </div>
    );
  }
);
export default Input;
