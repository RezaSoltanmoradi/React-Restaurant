import styles from "./HeaderCardButton.module.scss";
import { TiShoppingCart } from "react-icons/ti";
import { memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
const HeaderCardButton = ({ onClick }) => {
  
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(true);
  const { userData } = useContext(AuthContext);
  const { items } = userData.checkout;
  const numberOfCartItems =
    items?.reduce((curNamber, item) => {
      return curNamber + item.amount;
    }, 0) ?? 0;

  useEffect(() => {
    if (items?.length === 0) {
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
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : " "}`;
  return (
    <button className={btnStyles} onClick={onClick}>
      <span
        className={numberOfCartItems > 0 ? styles.validBadge : styles.badge}
      >
        {numberOfCartItems}{" "}
      </span>
      <span className={styles.cart}>سبد خرید</span>
      <span className={styles.icon}>
        <TiShoppingCart />
      </span>
    </button>
  );
};
export default memo(HeaderCardButton);
