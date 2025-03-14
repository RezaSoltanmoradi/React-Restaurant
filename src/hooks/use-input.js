import { useCallback, useMemo, useReducer } from "react";
const types = {
  input: "INPUT",
  blur: " BLUR",
  reset: "RESET",
};
const defaultState = {
  value: "",
  isTuched: false,
};
const inputStateReducer = (state, action) => {
  switch (action.type) {
    case types.input:
      return {
        ...state,
        value: action.value,
      };
    case types.blur:
      if (state.isTuched) return state;
      return {
        value: state.value,
        isTuched: true,
      };
    case types.reset:
      return {
        value: "",
        isTuched: false,
      };
    default:
      return defaultState;
  }
};
const useInput = (validInputValue) => {
  const [inputState, dispatchInputState] = useReducer(
    inputStateReducer,
    defaultState
  );
  const valueIsValid = validInputValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTuched;
  const valueChangeHandler = useCallback((event) => {
    dispatchInputState({
      type: types.input,
      value: event.target.value,
    });
  }, []);

  const inputBlurHandler = useCallback(() => {
    dispatchInputState({ type: types.blur });
  }, []);
  const resetHanlder = useCallback(() => {
    dispatchInputState({ type: types.reset });
  }, []);
  const value = useMemo(
    () => ({
      value: inputState.value,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      resetValue:resetHanlder,
    }),
    [inputState, valueIsValid, hasError, resetHanlder]
  );

  return value;
};
export default useInput;
