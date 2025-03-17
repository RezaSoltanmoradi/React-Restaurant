import classes from "./input.module.scss";
const Input = ({ label, id, isValid, error, ...props }) => {
  // props incloude {onChange , onBlur , type , placehoder, value}
  return (
    <div>
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ""
        }`}
      >
        <label className="pb-1 pb-md-0" htmlFor={id}>
          {label}:
        </label>
        <input id={id} {...props} autoComplete={id} />
      </div>
      <p className={classes.content}>{!isValid && error}</p>
    </div>
  );
};
export default Input;
