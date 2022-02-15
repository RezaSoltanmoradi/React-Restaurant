import styles from "./HeaderCardButton.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext";
const HeaderCardButton = ({ onClick }) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(true);
    const cartCtx = useContext(MainContext);
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNamber, item) => {
        return curNamber + item.amount;
    }, 0);
    const btnStyles = `${styles.button} ${
        btnIsHighlighted ? styles.bump : " "
    }`;

    useEffect(() => {
        if (items.length === 0) {
            setBtnIsHighlighted(false);
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={btnStyles} onClick={onClick}>
            <span
                className={
                    numberOfCartItems > 0 ? styles.validBadge : styles.badge
                }
            >
                {numberOfCartItems}{" "}
            </span>
            <span className={styles.cart}>سبد خرید</span>
            <span className={styles.icon}>
                <AiOutlineShoppingCart />
            </span>
        </button>
    );
};
export default HeaderCardButton;
