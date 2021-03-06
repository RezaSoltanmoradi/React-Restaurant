import styles from "./Checkout.module.scss";
import Button from "../UI/Button";
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
        formInputValidity.name ? "" : styles.inValid
    }`;
    const cityControlStyles = ` ${styles.control} ${
        formInputValidity.city ? "" : styles.inValid
    }`;
    const addressControlStyles = ` ${styles.control} ${
        formInputValidity.address ? "" : styles.inValid
    }`;
    const postalCodeControlStyles = ` ${styles.control} ${
        formInputValidity.postalCode ? "" : styles.inValid
    }`;
    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlStyles}>
                <label htmlFor="name"> ?????? ?? ?????? ????????????????:</label>
                <input
                    type="text"
                    id="name"
                    ref={nameInputRef}
                    placeholder="?????? ?????? ???? ???????? ????????..."
                />
            </div>
            {!formInputValidity.name && (
                <p className={styles.error}> ?????? ?? ?????? ???????????????? ?????????? ????????</p>
            )}
            <div className={cityControlStyles}>
                <label htmlFor="city"> ?????? :</label>
                <input
                    type="text"
                    id="city"
                    ref={cityInputRef}
                    placeholder="?????? ?????? ???? ???????? ????????..."
                />
            </div>
            {!formInputValidity.city && (
                <p className={styles.error}> ?????? ?????? ???? ???????? ????????</p>
            )}
            <div className={addressControlStyles}>
                <label htmlFor="street"> ???????? ????????:</label>
                <input
                    type="text"
                    id="street"
                    ref={addressInputRef}
                    placeholder="???????? ?????? ???? ???????? ????????..."
                />
            </div>
            {!formInputValidity.address && (
                <p className={styles.error}> ???????? ?????????? ????????</p>
            )}
            <div className={postalCodeControlStyles}>
                <label htmlFor="postal">???? ????????:</label>
                <input
                    type="text"
                    id="postal"
                    ref={postalCodeInputRef}
                    placeholder="???? ???????? ?????? ???? ???????? ????????..."
                />
            </div>
            {!formInputValidity.postalCode && (
                <p className={styles.error}>
                    {" "}
                    ???? ???????? ?????????? ????????(?????????? 5 ??????????????){" "}
                </p>
            )}
            <div className="text-center mx-5 d-flex pb-4 mt-3">
                <Button type="submit"> ??????????</Button>
                <Button type="button" className="mx-4" onClick={onCancel}>
                    {" "}
                    ??????{" "}
                </Button>
            </div>
        </form>
    );
};
export default Checkout;
