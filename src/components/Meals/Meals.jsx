import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./Meals.summery";
const Meals = () => {
    return (
        <Fragment>
            <MealsSummary/>
            <AvailableMeals />
        </Fragment>
    );
};
export default Meals;
