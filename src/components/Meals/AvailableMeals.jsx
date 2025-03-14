import styles from "./AvailableMeals.module.scss";
import Card from "../UI/Card/card";
import MealItems from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import Loading from "../UI/loading/loading";
import iranianFoods from "../../data/IranianFoods";
const AvailableMeals = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const mealsList = iranianFoods.map(
    (meal, index) =>
      meal.title && (
        <MealItems
          id={meal.id}
          key={meal.id + index}
          name={meal.title}
          description={meal.description}
          price={Number(meal.price)}
        />
      )
  );
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
export default AvailableMeals;
