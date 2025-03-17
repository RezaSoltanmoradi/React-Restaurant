import { memo } from "react";
import styles from "./card.module.scss";
const Card = ({ className, children }) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};
export default memo(Card);
