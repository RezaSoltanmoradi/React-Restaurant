import styles from "./CartItem.module.scss";
import { Fragment } from "react/cjs/react.production.min";
import { memo, useContext } from "react";
import Button from "../UI/Button/Button";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
const CartItem = (props) => {
  const price = ` ${props.price.toFixed(2)} تومان`;
  const { removeItem, addItem } = useContext(CartContext);
  const { isLoggedIn, userData } = useContext(AuthContext);
  const { items } = userData.checkout;
  const removeHandler = () => {
    if (items && isLoggedIn) {
      removeItem(props.id);
    }
  };
  const addItemHandler = () => {
    if (isLoggedIn) {
      addItem({
        productId: props.id,
        name: props.name,
        amount: 1,
        price: props.price,
      });
    }
  };
  return (
    <Fragment>
      <li className={styles["cart-item"]}>
        <div>
          <h2 className={styles.name}>{props.name} *</h2>
          <div className={styles.container}>
            <div className={styles.actions}>
              <Button onClick={removeHandler}> -</Button>
              <Button onClick={addItemHandler}>+ </Button>
            </div>
            <div className={styles.summary}>
              <span className={styles.amount}> {props.amount} x</span>
              <span className={styles.price}>{price}</span>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};
export default memo(CartItem);
