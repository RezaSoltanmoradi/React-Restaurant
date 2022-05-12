import React, { useRef, useImperativeHandle, forwardRef } from "react";

import classes from "./input.module.scss";
const Input = forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    };
    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    let content = "";

    switch (props.label) {
        case "Name":
            content = "نام  معتبر نیست ( حداقل 4 حرف )  ";
            break;
        case "E-Mail":
            content = "ایمیل معتبر نیست (  شامل @ میشود)  ";
            break;
        default:
            content =
                " پسورد شامل یک حرف بزرگ و یک عدد و بیش از 8 کاراکتر میباشد";
    }
    return (
        <div>
            <div
                className={`${classes.control} ${
                    props.isValid === false ? classes.invalid : ""
                }`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    ref={inputRef}
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </div>
            {props.errorMessage === false ? (   
                " "
            ) : (
                <p className={classes.content}>{content}</p>
            )}
        </div>
    );
});
export default Input;
