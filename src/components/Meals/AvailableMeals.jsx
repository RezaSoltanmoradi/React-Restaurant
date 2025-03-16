import styles from "./AvailableMeals.module.scss";
import Card from "../UI/Card/card";
import MealItems from "./MealItem/MealItem";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Loading from "../UI/loading/loading";
import iranianFoods from "../../data/IranianFoods";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);
  const { addItem } = useContext(CartContext);
  const addToCartHandler = useCallback(({ amount, id, price, name }) => {
    if (!isLoggedIn) return;
    addItem({ productId: id, name, amount, price });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const mealsList = useMemo(() => {
    return iranianFoods.map(
      (meal, index) =>
        meal.title && (
          <MealItems
            id={meal.id}
            key={meal.id + index}
            name={meal.title}
            description={meal.description}
            price={Number(meal.price)}
            onAddToCart={addToCartHandler}
          />
        )
    );
  }, [addToCartHandler]); // iranianFoods به وابستگی‌ها اضافه شده است

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={styles.meals}>
      <Card>
        <div>
          <ul>{mealsList}</ul>
        </div>
      </Card>
    </section>
  );
};

export default memo(AvailableMeals);
