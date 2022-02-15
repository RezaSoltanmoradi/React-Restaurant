import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.scss";
import MainContext from "../../context/MainContext";

const MealItems = (props) => {
    const cartCtx = useContext(MainContext);
    const { addItem, isLoggedIn, items } = cartCtx;
    const price = `تومان ${props.price.toFixed(2)}  `;
    // create a funcion  as a prop to MealItemForm() component
    const addToCartHandler = (amount) => {
        if (!isLoggedIn) {
            return;
        } else {
            addItem({
                productId: props.id,
                name: props.name,
                amount: amount,
                price: props.price,
            });
        }
    };
    return (
        <li className={styles.meal}>
            <div>
                <h3 className={styles.title}>{props.name}</h3>
            </div>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
            </div>
            <hr />
        </li>
    );
};
export default MealItems;
