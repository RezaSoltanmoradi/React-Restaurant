import { memo } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.scss";

const MealItems = ({ id, name, description, onAddToCart, price }) => {
  const fixedPrice = `تومان ${price.toFixed(2)}  `;
  return (
    <li className={styles.meal}>
      <div>
        <h3 className={styles.title}>{name}</h3>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.footer}>
        <MealItemForm id={id} onAddToCart={(amount) => onAddToCart({id, name, price, amount})} />
        <div className={styles.text}>
          قیمت:
          <span className={styles.price}>{fixedPrice}</span>
        </div>
      </div>
      <div className={styles.bottom} />
    </li>
  );
};
export default memo(MealItems);
