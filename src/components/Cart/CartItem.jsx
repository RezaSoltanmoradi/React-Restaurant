import styles from "./CartItem.module.scss";
import { Fragment } from "react/cjs/react.production.min";
import { useContext } from "react";
import MainContext from "../context/MainContext";
// use props from Cart() component
const CartItem = (props) => {
    const price = ` ${props.price.toFixed(2)} تومان`;
    const cartCtx = useContext(MainContext);
    const { removeItem, addItem, isLoggedIn } = cartCtx;
    const removeHandler = () => {
        if (isLoggedIn) {
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
                    <h2 className={styles.name}>{props.name}</h2>
                    <div className="row mt-5 ">
                        <div className={styles.actions}>
                            <button onClick={removeHandler}> -</button>
                            <button onClick={addItemHandler}>+ </button>
                        </div>
                        <div className={styles.summary}>
                            <span className={styles.amount}>
                                {" "}
                                {props.amount} x
                            </span>
                            <span className={styles.price}>{price}</span>
                        </div>
                    </div>
                </div>
            </li>
        </Fragment>
    );
};
export default CartItem;
