import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "../../components/UI/Card/card";
import Input from "../../components/UI/loginInput/input";
import styles from "./Auth.module.scss";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import allRoutes from "../../helper/allRoutes";
import Button from "../../components/UI/Button/Button";
import useInput from "../../hooks/use-input";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import Modal from "../../components/UI/Modal/Modal";

const isValidPassword = (value) => {
  const reg = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/);
  return reg.test(value);
};
const validText = (value) => value.trim().length > 3;
const isValidEmail = (value) => value.includes("@") && value.trim().length > 4;

const Auth = React.memo(() => {
  const { hideCardItems, showCardItems } = useContext(CartContext);
  const { onLogin, onRegister } = useContext(AuthContext);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { authId } = useParams();
  const userNameRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const {
    value: userName,
    isValid: validUserName,
    hasError: userNameError,
    inputBlurHandler: userNameBlur,
    valueChangeHandler: userNameChange,
    resetValue: resetUserName,
  } = useInput(validText);
  const {
    value: email,
    isValid: validEmail,
    hasError: emailError,
    inputBlurHandler: emailBlur,
    valueChangeHandler: emailChange,
    resetValue: resetEmail,
  } = useInput(isValidEmail);
  const {
    value: password,
    isValid: validPassword,
    hasError: passwordError,
    inputBlurHandler: passwordBlur,
    valueChangeHandler: passwordChange,
    resetValue: resetPassword,
  } = useInput(isValidPassword);

  useEffect(() => {
    if (authId === "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setFormSubmit(false);

    resetEmail();
    resetPassword();
    resetUserName();
  }, [authId]);
  const formValidtation =
    validEmail && validPassword && (isLogin ? true : validUserName);

  const submitHandler = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    setError(null);
    if (formValidtation) {
      if (isLogin) {
        try {
          onLogin({ email, password });
          resetEmail();
          resetPassword();
          setFormSubmit(false);
        } catch (error) {
          showCardItems();
          setError(error.message);
        }
      } else {
        try {
          onRegister({ userName, password, email });
          resetEmail();
          resetPassword();
          resetUserName();
          setFormSubmit(false);
          navigate(allRoutes.loginRoute());
        } catch (error) {
          showCardItems();
          setError(error.message);
        }
      }
    }
  };
  const cardStyle = `${styles.login} ${
    isLogin ? styles.loginSize : styles.RegisterSize
  }`;

  return (
    <div className={styles.mainAuth}>
      {error && (
        <Modal width="40%">
          <p className={styles.content}>{error}</p>
          <div className={styles.action}>
            <Button onClick={hideCardItems}>بستن</Button>
          </div>
        </Modal>
      )}
      <Card className={cardStyle}>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <Input
              id="userName"
              label="نام کاربری"
              type="text"
              placeholder="Enter user name..."
              value={userName}
              isValid={formSubmit ? validUserName : !userNameError}
              ref={userNameRef}
              onChange={userNameChange}
              onBlur={userNameBlur}
              errorMessage={formSubmit ? !validUserName : userNameError}
            />
          )}

          <Input
            id="email"
            label="ایمیل"
            type="email"
            placeholder="Enter email..."
            value={email}
            isValid={formSubmit ? validEmail : !emailError}
            ref={emailInputRef}
            onChange={emailChange}
            onBlur={emailBlur}
            errorMessage={formSubmit ? !validEmail : emailError}
          />

          <Input
            id="password"
            label="رمز عبور"
            type="password"
            placeholder="Enter password..."
            value={password}
            isValid={formSubmit ? validPassword : !passwordError}
            ref={passwordInputRef}
            onChange={passwordChange}
            onBlur={passwordBlur}
            errorMessage={formSubmit ? !validPassword : passwordError}
          />

          <Button
            type="submit"
            className={`${styles.btn} ${!isLogin && styles.registerBtn}`}
          >
            {isLogin ? "ورود" : "ثبت نام"}
          </Button>
        </form>
      </Card>
    </div>
  );
});

export default Auth;
