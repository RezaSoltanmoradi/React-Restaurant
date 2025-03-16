import { memo, useRef } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const MealItemForm = ({ onAddToCart, id }) => {
  const amountInputRef = useRef(null);
  // تابع اعتبارسنجی مقدار ورودی
  const validateAmount = (value) => {
    const enteredAmountNumber = +value;
    return enteredAmountNumber >= 1 && enteredAmountNumber <= 5;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    if (!validateAmount(enteredAmount)) return;

    onAddToCart(+enteredAmount);
  };

  const handleFocus = () => {
    amountInputRef.current.value = "";
  };

  const handleBlur = () => {
    if (!validateAmount(amountInputRef.current.value)) {
      setTimeout(() => {
        amountInputRef.current.value = 1;
      }, 200);
    }
  };

  return (
    <form
      className="d-flex justify-content-between align-items-center col-12 col-md-4"
      onSubmit={submitHandler}
    >
      <Input
        className="ml-5"
        ref={amountInputRef}
        label="تعداد"
        input={{
          id: id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          onFocus: handleFocus,
          onBlur: handleBlur,
        }}
      />
      <Button type="submit"> افزودن + </Button>
    </form>
  );
};

export default memo(MealItemForm);
