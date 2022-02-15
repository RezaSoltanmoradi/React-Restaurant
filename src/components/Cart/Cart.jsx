import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./cart.module.scss";
import { useContext } from "react";
import MainContext from "../context/MainContext";

const Cart = () => {

    const cartCtx = useContext(MainContext);
    const {showCardItems, items, totalAmount}=cartCtx;

    const totalAmountFixed = `تومان ${totalAmount.toFixed(2)}`;
    const hasItems = items.length > 0;
    const cartItems = (
        <ul className={styles["cart-item"]}>
            {items.map((item) => (
                // export props to CartItem() component
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
    return (
        <Modal >
            {cartItems}
            <div className={styles.total}>
                <span>{totalAmountFixed}</span>
                <span className={styles.totalAmount}> :جمع کل</span>
            </div>
            <div className={styles.actions}>
                {hasItems && (
                    <button className={styles["button-alt"]}>سفارش</button>
                )}
                <button className={styles.button} onClick={showCardItems}>
                    بستن
                </button>
            </div>
        </Modal>
    );
};
export default Cart;
