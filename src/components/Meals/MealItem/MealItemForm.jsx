import { useRef, useState } from "react";
import Input from "../../UI/Input";
import Button from '../../UI/Button';
const MealItemForm = ({ onAddToCart }, props) => {
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
        onAddToCart(enteredAmountNumber);
    };

    return (
        <form className='d-flex justify-content-between align-items-center' onSubmit={submitHandler}>
            <Input
            className="ml-5"
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
            <Button  type="submit"> افزودن + </Button>
            {!amountIsValid && <p>please enter a valid amount (1 - 5 )</p>}
        </form>
    );
};
export default MealItemForm;
