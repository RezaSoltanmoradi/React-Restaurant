import styles from "./AvailableMeals.module.scss";
import Card from "../UI/card";
import MealItems from "./MealItem/MealItem";
const AvailableMeals = () => {
    const mealsContent = [
        {
            name: "قرمه سبزی",
            description:
                " یه غذای ایرانی خوشمزه که معمولا برای مهمونی و همه ی مناسبت ها عالیه",
            price: 16.99,
            id: "m1",
        },
        {
            name: " جوجه کباب",
            description: "  یه غذای عالی که معمولا برای مهمونی ها مناسبه ",
            price: 22.99,
            id: "m2",
        },
        {
            name: " ابگوشت گوسفندی",
            description:
                " یه غذای محلی که معمولا توی خونه های ایرانی درست میشه و میل میشه.     ",
            price: 17.5,
            id: "m3",
        },
        {
            name: "  باقاله پلو",
            description:
                " یه غذای محلی خوشمزه که  توی خونه   درست میشه و میل میشه.     ",
            price: 16.38,
            id: "m4",
        },
    ];

    const mealsList = mealsContent.map((meal, index) => (
        // export props to MealItems() component
        <MealItems
            id={meal.id}
            key={meal.id + index}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));
    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};
export default AvailableMeals;
