import styles from "./Slider.module.scss";
import one from "../../../assets/pictures/1one.jpg";
import two from "../../../assets/pictures/2two.jpg";
import three from "../../../assets/pictures/3three.jpg";
import four from "../../../assets/pictures/4four.jpg";
import five from "../../../assets/pictures/5five.jpg";
import six from "../../../assets/pictures/6six.jpg";
import seven from "../../../assets/pictures/7seven.jpg";
import eight from "../../../assets/pictures/8eight.jpg";
import nine from "../../../assets/pictures/9nine.jpg";
import ten from "../../../assets/pictures/10ten.jpg";
import eleven from "../../../assets/pictures/11eleven.jpg";
import twoen from "../../../assets/pictures/12twoen.jpg";
import therteen from "../../../assets/pictures/13therteen.jpg";
import fourteen from "../../../assets/pictures/14fourteen.jpg";
import fiveteen from "../../../assets/pictures/15fivteen.jpg";
import sixteen from "../../../assets/pictures/16sixteen.jpg";
import seventeen from "../../../assets/pictures/17seventeen.jpg";
import eightteen from "../../../assets/pictures/18eghtteen.jpg";
import { useEffect, useState } from "react";
const Slider = () => {
  const images = [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twoen,
    therteen,
    fourteen,
    fiveteen,
    sixteen,
    seventeen,
    eightteen,
  ];
  const [index, setIndex] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <section className={styles.slider}>
      <div
        key={index}
        className={styles["image-container"]}
        style={{ backgroundImage: `url(${images[index]})` }}
      />
    </section>
  );
};

export default Slider;
