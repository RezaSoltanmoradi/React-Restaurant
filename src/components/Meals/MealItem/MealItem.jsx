import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.scss";
import { CartContext } from "../../../context/CartContext";
import { AuthContext } from "../../../context/AuthContext";

const MealItems = (props) => {
  const { addItem } = useContext(CartContext);
  const {isLoggedIn } = useContext(AuthContext);
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
      <div className={styles.footer}>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        <div className={styles.text}>
          قیمت:
          <span className={styles.price}>{price}</span>
        </div>
      </div>
      <div className={styles.bottom}/>
    </li>
  );
};
export default MealItems;
