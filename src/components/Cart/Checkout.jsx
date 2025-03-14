import styles from "./Checkout.module.scss";
import Button from "../UI/Button/Button";
import { useRef, useState } from "react";
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim() > 4;
const Checkout = ({ onCancel, onConfirm }) => {
  const [formInputValidity, setFormInputValidty] = useState({
    name: true,
    city: true,
    address: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalCodeIaValid = isFiveChars(enteredPostalCode);
    setFormInputValidty({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      address: enteredAddressIsValid,
      postalCode: enteredPostalCodeIaValid,
    });
    const formValidation =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredAddressIsValid &&
      enteredPostalCodeIaValid;
    if (!formValidation) {
      if (!enteredPostalCodeIaValid) {
        postalCodeInputRef.current.value = "";
      }
      return;
    } else {
      onConfirm({
        name: enteredName,
        city: enteredCity,
        address: enteredAddress,
        postalCode: enteredPostalCode,
      });
    }
  };
  const nameControlStyles = ` ${styles.control} ${
    formInputValidity.name ? styles.valid : styles.inValid
  }`;
  const cityControlStyles = ` ${styles.control} ${
    formInputValidity.city ? styles.valid : styles.inValid
  }`;
  const addressControlStyles = ` ${styles.control} ${
    formInputValidity.address ? styles.valid : styles.inValid
  }`;
  const postalCodeControlStyles = ` ${styles.control} ${
    formInputValidity.postalCode ? styles.valid : styles.inValid
  }`;
  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor="name"> نام و نام خانوادگی:</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          placeholder="نام خود را وارد کنید..."
        />
      </div>

      <div className={cityControlStyles}>
        <label htmlFor="city"> شهر :</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          placeholder="شهر خود را وارد کنید..."
        />
      </div>

      <div className={addressControlStyles}>
        <label htmlFor="street"> آدرس منزل:</label>
        <input
          type="text"
          id="street"
          ref={addressInputRef}
          placeholder="آدرس خود را وارد کنید..."
        />
      </div>

      <div className={postalCodeControlStyles}>
        <label htmlFor="postal">کد پستی:</label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          placeholder="کد پستی خود را به عدد وارد کنید..."
        />
      </div>

      <div className="d-flex justify-content-end mt-5 pb-4">
        <Button type="submit"> سفارش</Button>
        <Button type="button" onClick={onCancel}>
          {" "}
          لغو{" "}
        </Button>
      </div>
    </form>
  );
};
export default Checkout;
