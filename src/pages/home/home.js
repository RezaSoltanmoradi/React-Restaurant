import { Fragment, memo } from "react";
import Meals from "../../components/Meals/Meals";
import Cart from "../../components/Cart/Cart";
import Slider from "../../components/UI/Slider/Slider";

const HomePage = () => {
  return (
    <Fragment>
      <Cart />
      <Slider />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default memo(HomePage);
