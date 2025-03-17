import styles from "./HeaderCardButton.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const HeaderCardButton = ({ onClick }) => {
  const [btnGrowUp, setBtnGrowUp] = useState(true);
  const { userData } = useContext(AuthContext);
  const { items } = userData.checkout;
  const calcAllItems =
    items?.reduce((collectNumber, currentNumber) => {
      return collectNumber + currentNumber.amount;
    }, 0) ?? 0;
  useEffect(() => {
    if (items?.length === 0) {
      setBtnGrowUp(false);
    }
    setBtnGrowUp(true);
    const timer = setTimeout(() => {
      setBtnGrowUp(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnStyles = `${styles.button} ${btnGrowUp ? styles.bump : " "}`;
  return (
    <button className={btnStyles} onClick={onClick}>
      <span
        className={calcAllItems > 0 ? styles.validBadge : styles.badge}
      >
        {calcAllItems}{" "}
      </span>
      <span className={styles.cart}>سبد خرید</span>
      <span className={styles.icon}>
        <TiShoppingCart />
      </span>
    </button>
  );
};
export default memo(HeaderCardButton);
