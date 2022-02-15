import { useRef, useState } from "react";
import styles from "./mealItemForm.module.scss";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    // create ref as a prop to Input() component
    const amountInputRef = useRef(0);

    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }
        // use props function from MealItem() component
        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="تعداد"
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button type="submit"> افزودن + </button>
            {!amountIsValid && <p>please enter a valid amount (1 - 5 )</p>}
        </form>
    );
};
export default MealItemForm;
