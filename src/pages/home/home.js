import { Fragment, memo, useContext } from "react";
import Meals from "../../components/Meals/Meals";
import Cart from "../../components/Cart/Cart";
import Slider from "../../components/UI/Slider/Slider";
import { CartContext } from "../../context/CartContext";

const HomePage = () => {
  const { modalIsShown: cartModalIsShown } = useContext(CartContext);
  return (
    <Fragment>
      {cartModalIsShown && <Cart />}
      <Slider />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default memo(HomePage);
