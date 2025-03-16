import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext({
  addItem: () => {},
  removeItem: () => {},
  showCardItems: () => {},
  hideCardItems: () => {},
  cardIsShown: false,
});

const types = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
  clearCart: "CLEAR_CART",
};

const CartReducer = (
  state,
  { updateAllUsers, updateUserData, userData, ...action }
) => {
  let updatedItems, updateTotalAmount;

  switch (action.type) {
    case types.addItem: {
      let itemExists = false;
      updatedItems = state?.items?.map((item) => {
        if (item.productId === action.item.productId) {
          itemExists = true;
          return { ...item, amount: item.amount + action.item.amount };
        }
        return item;
      });
      if (!itemExists) updatedItems = [...updatedItems, action.item];
      updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      break;
    }
    case types.removeItem: {
      updatedItems = state?.items?.reduce((acc, item) => {
        if (item.productId === action.id) {
          updateTotalAmount = state.totalAmount - item.price;
          if (item.amount > 1) acc.push({ ...item, amount: item.amount - 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      break;
    }
    case types.clearCart: {
      return action.newState;
    }
    default:
      return state;
  }
  const newState = { items: updatedItems, totalAmount: updateTotalAmount };
  updateAllUsers({ checkout: newState, email: userData.email });
  updateUserData({ checkout: newState });
  return newState;
};

const CartContextProvider = ({ children }) => {
  const [cardIsShown, setCardIsShown] = useState(false);
  const { updateAllUsers, updateUserData, userData } = useContext(AuthContext);

  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    userData.checkout
  );
  useEffect(() => {
    dispatchCartAction({
      type: types.clearCart,
      newState: userData.checkout,
    });
  }, [userData.checkout]);

  const addItemtoCartHandler = useCallback(
    (item) => {
      dispatchCartAction({
        type: types.addItem,
        item,
        updateAllUsers,
        updateUserData,
        userData,
      });
    },
    [updateAllUsers, updateUserData, userData]
  );

  const removeItemFromCartHandler = useCallback(
    (id) => {
      dispatchCartAction({
        type: types.removeItem,
        id,
        updateAllUsers,
        updateUserData,
        userData,
      });
    },
    [updateAllUsers, updateUserData, userData]
  );
  const showCardHandler = useCallback(() => {
    setCardIsShown(true);
  }, []);
  const hideCardShown = useCallback(() => {
    setCardIsShown(false);
  }, []);
  const contextValue = useMemo(() => {
    return {
      addItem: addItemtoCartHandler,
      removeItem: removeItemFromCartHandler,
      showCardItems: showCardHandler,
      hideCardItems: hideCardShown,
      cardIsShown,
    };
  }, [
    addItemtoCartHandler,
    removeItemFromCartHandler,
    cardIsShown,
    hideCardShown,
    showCardHandler,
  ]);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
