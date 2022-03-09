import React, { useState, useReducer, useContext, useRef } from "react";
import Card from "../../components/UI/card";
import Input from "../../components/UI/loginInput/input";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router";
import allRoutes from "../../helper/allRoutes";
import MainContext from "../../components/context/MainContext";
import { Fragment } from "react/cjs/react.production.min";
import Header from "../../components/Layout/Header";
import Button from "../../components/UI/Button";
const types = {
    inputValue: "USER_INPUT",
    inputBlur: "INPUT_BLUR",
};
const isvalidPassword = (value) => {
    const reg = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/);
    return reg.test(value);
};
const isNotEmpty = (value) => value.trim().length > 3;
const isValidEmail = (value) => value.includes("@") && value.trim().length > 4;

const Login = () => {
    const context = useContext(MainContext);
    const { onLogin, userNameHandle } = context;
    const history = useNavigate();

    const userNameRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const defalutState = {
        value: "",
        isValid: null ? false : null,
    };
    const userNameReducer = (state, action) => {
        switch (action.type) {
            case types.inputValue:
                return {
                    ...state,
                    value: action.val,
                    isValid: isNotEmpty(action.val),
                };
            case types.inputBlur:
                return {
                    value: state.value,
                    isValid: isNotEmpty(state.value),
                };
            default:
                return defalutState;
        }
    };
    const emailReducer = (state, action) => {
        switch (action.type) {
            case types.inputValue:
                return {
                    ...state,
                    value: action.val,
                    isValid: isValidEmail(action.val),
                };
            case types.inputBlur:
                return {
                    value: state.value,
                    isValid: isValidEmail(state.value),
                };
            default:
                return defalutState;
        }
    };
    const passwordReducer = (state, action) => {
        switch (action.type) {
            case types.inputValue:
                return {
                    ...state,
                    value: action.val,
                    isValid: isvalidPassword(action.val),
                };
            case types.inputBlur:
                return {
                    value: state.value,
                    isValid: isvalidPassword(state.value),
                };
            default:
                return defalutState;
        }
    };
    const [formIsValid, setFormIsValid] = useState({
        name: true,
        email: true,
        password: true,
    });
    const [userNameState, dispatchUserName] = useReducer(
        userNameReducer,
        defalutState
    );
    const [emailState, dispatchEmail] = useReducer(emailReducer, defalutState);
    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
        defalutState
    );

    const { isValid: userNameIsValid } = userNameState;
    const { isValid: emailIsvalid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    const formValidtation = emailIsvalid && passwordIsValid && userNameIsValid;

    const userNameChangeHandler = (event) => {
        dispatchUserName({ type: types.inputValue, val: event.target.value });
        setFormIsValid({
            name: isNotEmpty(event.target.value),
            email: formIsValid.email,
            password: formIsValid.password,
        });
        userNameHandle(event.target.value);
    };
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: types.inputValue, val: event.target.value });
        setFormIsValid({
            name: formIsValid.name,
            email: isValidEmail(event.target.value),
            password: formIsValid.password,
        });
    };
    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: types.inputValue, val: event.target.value });
        setFormIsValid({
            name: formIsValid.name,
            email: formIsValid.email,
            password: isvalidPassword(event.target.value),
        });
    };

    const validateUserNameHandler = () => {
        dispatchUserName({ type: types.inputBlur });
    };
    const validateEmailHandler = () => {
        dispatchEmail({ type: types.inputBlur });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: types.inputBlur });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setFormIsValid({
            name: userNameIsValid,
            email: emailIsvalid,
            password: passwordIsValid,
        });
        if (formValidtation) {
            onLogin(emailState.value, passwordState.value, userNameState.value);

            userNameHandle(userNameState.value);

            history(`${allRoutes.homeRoute()}`);
            
        } else if (!userNameIsValid) {
            userNameRef.current.focus();
        } else if (!emailIsvalid) {
            emailInputRef.current.focus();
        } else if (!passwordIsValid) {
            passwordInputRef.current.focus();
        } else {
            return;
        }
    };

    return (
        <Fragment>
            <Header />
            <Card className={styles.login}>
                <form onSubmit={submitHandler}>
                    <Input
                        id="userName"
                        label="Name"
                        type="text"
                        value={userNameState.value}
                        isValid={userNameIsValid}
                        ref={userNameRef}
                        onChange={userNameChangeHandler}
                        onBlur={validateUserNameHandler}
                        errorMessage={!formIsValid.name}
                    />

                    <Input
                        id="email"
                        label="E-Mail"
                        type="email"
                        value={emailState.value}
                        isValid={emailIsvalid}
                        ref={emailInputRef}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        errorMessage={!formIsValid.email}
                    />  

                    <Input
                        id="password"
                        label="password"
                        type="password"
                        value={passwordState.value}
                        isValid={passwordIsValid}
                        ref={passwordInputRef}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        errorMessage={!formIsValid.password}
                    />

                    <div className={styles.actions}>
                        <Button type="submit" className={styles.btn}>
                            ورود
                        </Button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default Login;
