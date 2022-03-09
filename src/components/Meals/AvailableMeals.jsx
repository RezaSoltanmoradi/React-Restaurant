import styles from "./AvailableMeals.module.scss";
import Card from "../UI/card";
import MealItems from "./MealItem/MealItem";
import { useEffect, useState } from "react";
// import allRoutes from "../../helper/allRoutes";
// import { NavLink } from "react-router-dom";
// import mealsImage from "../../assets/thirdImage.jpg";
// import {
//     apiFetch,
//     area,
//     apiRoutes,
//     version,
//     versions,
// } from "../../helper/apiHelper";

const AvailableMeals = () => {
    const [Meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);
    //crate meals for resturant
    // const mealsContent = [
    //     {
    //         name: "قرمه سبزی",
    //         description:
    //             " یه غذای ایرانی خوشمزه که معمولا برای مهمونی و همه ی مناسبت ها عالیه",
    //         price: 16.99,
    //         id: "m1",
    //     },
    //     {
    //         name: " جوجه کباب",
    //         description: "  یه غذای عالی که معمولا برای مهمونی ها مناسبه ",
    //         price: 22.99,
    //         id: "m2",
    //     },
    //     {
    //         name: " ابگوشت گوسفندی",
    //         description:
    //             " یه غذای محلی که معمولا توی خونه های ایرانی درست میشه و میل میشه.",
    //         price: 17.5,
    //         id: "m3",
    //     },
    //     {
    //         name: "  باقاله پلو",
    //         description:
    //             " یه غذای محلی خوشمزه که  توی خونه   درست میشه و میل میشه.",
    //         price: 16.38,
    //         id: "m4",
    //     },
    // ];

    // const createCategory = async () => {
    //     // apiFetch({
    //     //     area: area.Admin,
    //     //     method: "POST",
    //     //     route: apiRoutes.ProductCategories,
    //     //     version: versions.V1,
    //     //     header: {
    //     //         "Content-Type": "application/json",
    //     //         Authorization:
    //     //             "Bearer " +
    //     //             JSON.parse(localStorage.getItem("userData")).access_token,
    //     //     },
    //     //     body: {
    //     //         title: "Test",
    //     //         parentId: null,
    //     //         description: "Descs....",
    //     //         text: "sdfssdfsd",
    //     //         isActive: true,
    //     //         id: 0,
    //     //     },
    //     //     parameters:'/${}'
    //     // })
    //     //     .then((res) => {
    //     //         console.log(res.data);
    //     //     })
    //     //     .catch((err) => {
    //     //         console.log(err);
    //     //     });
    // };
    // const removeCategory = async (productId) => {
    // console.log(Meals);
    // const allDataId = Meals.map((item) => item.id);
    // console.log(allDataId);
    // const filterData = allDataId.filter((id) => productId !== id);
    // console.log(productId);
    // try {
    //     const resopnse = await fetch(
    //         `https://192.168.1.7:5001/api/v1/Category/${productId}`,
    //         {
    //             method: "DELETE",
    //         }
    //     );
    //     const data = await resopnse.json();
    //     console.log(data);
    // } catch (error) {
    //     console.log(error);
    // }
    // };
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const request = await fetch(
                "https://resturant-2cd4e-default-rtdb.firebaseio.com/meals.json/"
            );
            if (!request.ok || !request.status === 200) {
                throw new Error("something went wrong...");
            }
            const response = await request.json();
            const loadedMeals = [];
            for (const key in response) {
                loadedMeals.push({
                    id: key,
                    title: !response[key].name ? null : response[key].name,
                    description: !response[key].description
                        ? null
                        : response[key].description,
                    price: !response[key].price ? null : response[key].price,
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

        // apiFetch({
        //     area: area.Global,
        //     method: "GET",
        //     route: apiRoutes.ProductCategories,
        //     version: versions.V1,
        // })
        //     .then((res) => {
        //         setMeals(res.data.data);
        //         setIsLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setIsLoading(false);
        //     });
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
        // export props to MealItems() component
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
