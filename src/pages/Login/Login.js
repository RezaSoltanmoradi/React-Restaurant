import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from "react";
import Card from "../../components/UI/card";
import Button from "../../components/UI/loginButton/Button";
import Input from "../../components/UI/loginInput/input";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import allRoutes from "../../helper/allRoutes";
import MainContext from "../../components/context/MainContext";
import { Fragment } from "react/cjs/react.production.min";
import Header from "../../components/Layout/Header";

const Login = () => {
    const context = useContext(MainContext);
    const { onLogin, userNameHandle } = context;
    const history = useNavigate();

    const userNameRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const defalutState = {
        value: "",
        isValid: null,
    };
    const userNameReducer = (state, action) => {
        switch (action.type) {
            case "USER_INPUT":
                return {
                    ...state,
                    value: action.val,
                    isValid: action.val.trim().length > 3,
                };
            case "INPUT_BLUR":
                return {
                    value: state.value,
                    isValid: state.value.trim().length > 3,
                };
            default:
                return { value: "", isValid: false };
        }
    };
    const emailReducer = (state, action) => {
        switch (action.type) {
            case "USER_INPUT":
                return {
                    ...state,
                    value: action.val,
                    isValid: action.val.includes("@"),
                };
            case "INPUT_BLUR":
                return {
                    value: state.value,
                    isValid: state.value.includes("@"),
                };
            default:
                return { value: "", isValid: false };
        }
    };
    const passwordReducer = (state, action) => {
        switch (action.type) {
            case "USER_INPUT":
                return {
                    ...state,
                    value: action.val,
                    isValid: action.val.trim().length > 6,
                };
            case "INPUT_BLUR":
                return {
                    value: state.value,
                    isValid: state.value.trim().length > 6,
                };
            default:
                return { value: "", isValid: false };
        }
    };

    const [formIsValid, setFormIsValid] = useState(false);

    const [userNameState, dispatchUserName] = useReducer(
        userNameReducer,
        defalutState
    );
    const [emailState, dispatchEmail] = useReducer(emailReducer, defalutState);
    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
        defalutState
    );

    const { isValid: emailIsvalid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    const { isValid: userNameIsValid } = userNameState;
    useEffect(() => {
        const timer = setTimeout(() => {
            setFormIsValid(emailIsvalid && passwordIsValid, userNameIsValid);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [emailState, passwordState, userNameState]);

    const userNameChangeHandler = (event) => {
        dispatchUserName({ type: "USER_INPUT", val: event.target.value });
        setFormIsValid(
            event.target.value.trim().length > 3 &&
                passwordState.isValid &&
                emailState.isValid
        );
        userNameHandle(event.target.value);
    };
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: "USER_INPUT", val: event.target.value });
        setFormIsValid(
            event.target.value.includes("@") &&
                passwordState.isValid &&
                userNameState.isValid
        );
    };
    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });
        setFormIsValid(
            emailState.isValid &&
                userNameState.isValid &&
                event.target.value.trim().length > 6
        );
    };

    const validateUserNameHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };
    const validateEmailHandler = () => {
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: "INPUT_BLUR" });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            onLogin(emailState.value, passwordState.value, userNameState.value);

            userNameHandle(userNameState.value);

            history(`${allRoutes.homeRoute()}`);
        } else if (!userNameIsValid) {
            userNameRef.current.focus();
        } else if (!emailIsvalid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
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
                    />
                    <div className={styles.actions}>
                        <Button type="submit" className={styles.btn}>
                            Login
                        </Button>
                    </div>
                </form>
            </Card>
        </Fragment>
    );
};

export default Login;
