import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/UI/Card/card";
import Input from "../../components/UI/AuthInput/input";
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
  const { hideModal, showModal } = useContext(CartContext);
  const { onLogin, onRegister } = useContext(AuthContext);
  const [formSubmit, setFormSubmit] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { authId } = useParams();

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
          showModal();
          setError((prevError) => {
            if (prevError === error.message) return prevError;
            return error.message;
          });
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
          showModal();
          setError((prevError) => {
            if (prevError === error.message) return prevError;
            return error.message;
          });
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
            <Button onClick={hideModal}>بستن</Button>
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
              onChange={userNameChange}
              onBlur={userNameBlur}
              isValid={formSubmit ? validUserName : !userNameError}
              error="Username must be at least 4 characters long."
            />
          )}

          <Input
            id="email"
            label="ایمیل"
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={emailChange}
            onBlur={emailBlur}
            isValid={formSubmit ? validEmail : !emailError}
            error="Email must include '@gmail.com'."
          />

          <Input
            id="password"
            label="رمز عبور"
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={passwordChange}
            onBlur={passwordBlur}
            isValid={formSubmit ? validPassword : !passwordError}
            error="Password must be at least 8 characters and include uppercase, lowercase, and a number."
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
