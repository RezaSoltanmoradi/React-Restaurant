import classes from "./loading.module.scss";
const Loading = ({ color }) => {
  return (
    <section className="text-center">
      <div
        className={`${classes["lds-roller"]} ${
          color ? classes.haveColor : classes.notHaveColor
        }`}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="mt-2 py-2 " style={{ color: color ? color : "#e9c46a" }}>
        Loading...
      </p>
    </section>
  );
};

export default Loading;
