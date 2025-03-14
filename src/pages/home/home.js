import { useEffect, useState } from "react";
import { Fragment } from "react";
import Meals from "../../components/Meals/Meals";
import styles from "./home.module.scss";
import Cart from "../../components/Cart/Cart";
import firstImg from "../../assets/pictures/firstImage.jpg";
import secondImg from "../../assets/pictures/secondImage.jpg";
import thirdImg from "../../assets/pictures/thirdImage.jpg";

const HomePage = () => {
  const images = [firstImg, secondImg, thirdImg];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
    <Fragment>
      <Cart />
      <div className={styles["main-image"]}>
        <div
          key={index} // هر بار که index تغییر می‌کنه، کامپوننت مجدداً رندر میشه
          className={styles["image-container"]}
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </div>
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default HomePage;
