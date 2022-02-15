import { Fragment, useContext } from "react";
import Header from "../../components/Layout/Header";
import mealsImage from "../../assets/thirdImage.jpg";
import Meals from "../../components/Meals/Meals";
import styles from "./home.module.scss";
import Cart from "../../components/Cart/Cart";
import MainContext from "../../components/context/MainContext";
const HomePage = () => {
    const context = useContext(MainContext);
    const { cardIsShown } = context;

    return (
        <Fragment>
            {cardIsShown && <Cart />}
            <Header />
            <div className={styles["main-image"]}>
                <img
                    className="mt-5"
                    src={mealsImage}
                    alt="a table full of delicious food!"
                />
            </div>
            <main>
                <Meals />
            </main>
        </Fragment>
    );
};
export default HomePage;
