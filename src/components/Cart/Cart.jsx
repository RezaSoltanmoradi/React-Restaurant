import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./cart.module.scss";
import MainContext from "../context/MainContext";
import Checkout from "./Checkout";
import Button from "../UI/Button";
const Cart = () => {
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(MainContext);
    const { hideCardItems, items, totalAmount, claerCart } = cartCtx;

    const totalAmountFixed = `تومان ${totalAmount.toFixed(2)}`;
    const hasItems = items.length > 0;
    const orderHandler = () => {
        setIsCheckout(true);
    };
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
    const submitOrderHandler = async (userData) => {
        setIsSubmiting(true);
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
        setIsSubmiting(false);
        setDidSubmit(true);
        claerCart();
    };
    const modalAction = (
        <div className={styles.actions}>
            {hasItems && (
                <Button onClick={orderHandler}>
                    سفارش
                </Button>
            )}
            <Button className={styles.button} onClick={hideCardItems}>
                بستن
            </Button>
        </div>
    );
    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>{totalAmountFixed}</span>
                <span className={styles.totalAmount}> :جمع کل</span>
            </div>
            {isCheckOut && hasItems && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={hideCardItems}
                />
            )}
            {!isCheckOut && modalAction}
            {isCheckOut && !hasItems && (
                <Button className={styles.Button} onClick={hideCardItems}>
                    بستن
                </Button>
            )}
        </Fragment>
    );
    const didSubmitModadalContent = (
        <div>
            <p className={styles.succesed}>😍 سفارش شما با موفقیت ثبت شد </p>
            <div className={styles.actions}>
                <Button onClick={hideCardItems}>بستن</Button>
            </div>
        </div>
    );

    const isSubmittingModalContent = (
        <section className="text-center">
            <div class={styles["lds-roller"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className="mt-2 py-2">sending orderd data...</p>
        </section>
    );

    return (
        <Modal>
            {!isSubmiting && !didSubmit && cartModalContent}
            {isSubmiting && isSubmittingModalContent}
            {!isSubmiting && didSubmit && didSubmitModadalContent}
        </Modal>
    );
};
export default Cart;
