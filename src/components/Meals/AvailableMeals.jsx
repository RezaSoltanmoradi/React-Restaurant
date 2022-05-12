import styles from "./AvailableMeals.module.scss";
import Card from "../UI/card";
import MealItems from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
    const [Meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);
    //crate meals for resturant
    const mealsContent = [
        {
            title: "قرمه سبزی",
            description:
                " یه غذای ایرانی خوشمزه که معمولا برای مهمونی و همه ی مناسبت ها عالیه",
            price: 16.99,
            id: "m1",
        },
        {
            title: " جوجه کباب",
            description: "  یه غذای عالی که معمولا برای مهمونی ها مناسبه ",
            price: 22.99,
            id: "m2",
        },
        {
            title: " ابگوشت گوسفندی",
            description:
                " یه غذای محلی که معمولا توی خونه های ایرانی درست میشه و میل میشه.",
            price: 17.5,
            id: "m3",
        },
        {
            title: "  باقاله پلو",
            description:
                " یه غذای محلی خوشمزه که  توی خونه   درست میشه و میل میشه.",
            price: 16.38,
            id: "m4",
        },
    ];

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            // const request = await fetch(
            //     "https://resturant-2cd4e-default-rtdb.firebaseio.com/meals.json/"
            // );
            // if (!request.ok || !request.status === 200) {
            //     throw new Error("something went wrong...");
            // }
            // const response = await request.json();
            // const loadedMeals = [];
            // for (const key in response) {
            //     loadedMeals.push({
            //         id: key,
            //         title: !response[key].name ? null : response[key].name,
            //         description: !response[key].description
            //             ? null
            //             : response[key].description,
            //         price: !response[key].price ? null : response[key].price,
            //     });
            // }
            // setMeals(loadedMeals);
            setMeals(mealsContent);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);
    if (isLoading) {
        return (
            <section className={styles.MealsLoading}>
                <p> Loadin ...</p>
                <div className={styles["lds-roller"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>
        );
    }
    if (httpError) {
        return (
            <section className={styles.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }
    const mealsList = Meals.map((meal, index) => (
        <div>
            {meal.title && (
                <MealItems
                    id={meal.id}
                    key={meal.id + index}
                    name={meal.title}
                    description={meal.description}
                    price={Number(meal.price)}
                />
            )}
        </div>
    ));
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
