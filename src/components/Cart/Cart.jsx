import React, {
  Fragment,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CartItem from "./CartItem";
import styles from "./cart.module.scss";
import Checkout from "./Checkout";
import Button from "../UI/Button/Button";
import Loading from "../UI/loading/loading";
import Modal from "../UI/Modal/Modal";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
const Cart = () => {
  const [isCheckOut, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const { hideCardItems, cardIsShown } = useContext(CartContext);
  const { userData, clearCheckout } = useContext(AuthContext);
  const { items, totalAmount } = userData.checkout;
  const totalAmountFixed = ` ${totalAmount?.toFixed(2) ?? 0} تومان`;
  const hasItems = items?.length > 0;
  const orderHandler = useCallback(() => {
    setIsCheckout(true);
  }, []);
  useEffect(() => {
    setIsCheckout(false);
    setDidSubmit(false);
  }, [cardIsShown]);
  const cartItems = (
    <ul className={styles["cart-item"]}>
      {items?.map((item) => (
        <CartItem
          key={item.productId}
          name={item.name}
          amount={item.amount}
          price={item.price}
          id={item.productId}
        />
      ))}
    </ul>
  );
  const submitOrderHandler = async (userData) => {
    setIsLoading(true);
    try {
      await fetch(
        "https://resturant-2cd4e-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItem: items,
          }),
        }
      );
    } catch (error) {
      console.log("error", error.message);
    }
    setIsLoading(false);
    setDidSubmit(true);
    setIsCheckout(false);
    clearCheckout();
  };
  const modalAction = (
    <div className={styles.actions}>
      <Button onClick={hideCardItems}>لغو</Button>
      {hasItems && <Button onClick={orderHandler}>سفارش</Button>}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}

      <div className={styles.total}>
        <span style={{ direction: "rtl" }}>{totalAmountFixed}</span>
        <div className={styles.borderCenter}></div>
        <span className={styles.totalAmount}> :جمع کل</span>
      </div>
      {isCheckOut && hasItems && (
        <Checkout onConfirm={submitOrderHandler} onCancel={hideCardItems} />
      )}
      {!isCheckOut && modalAction}
      {isCheckOut && !hasItems && (
        <Button className={styles.button} onClick={hideCardItems}>
          لغو
        </Button>
      )}
    </Fragment>
  );

  const didSubmitModadalContent = (
    <div>
      <p className={styles.succesed}>😍 سفارش شما با موفقیت ثبت شد </p>
      <div className={styles.actions}>
        <Button
          onClick={() => {
            hideCardItems();
            setDidSubmit(false);
          }}
        >
          بستن
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      width={!isLoading && !didSubmit && cartModalContent ? "60%" : "40%"}
      loading={isLoading}
    >
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && <Loading color="#e63946" />}
      {!isLoading && didSubmit && didSubmitModadalContent}
    </Modal>
  );
};
export default memo(Cart);
