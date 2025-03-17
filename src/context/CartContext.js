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
  showModal: () => {},
  hideModal: () => {},
  modalIsShown: false,
});

const types = {
  addItem: "ADD_ITEM",
  removeItem: "REMOVE_ITEM",
  defaultItem: "DEFAULT_ITEM",
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
    case types.defaultItem: {
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
  const [modalIsShown, setModalIsShown] = useState(false);
  const { updateAllUsers, updateUserData, userData } = useContext(AuthContext);

  const [, dispatchCartAction] = useReducer(CartReducer, userData.checkout);
  useEffect(() => {
    dispatchCartAction({
      type: types.defaultItem,
      newState: userData.checkout,
    });
  }, [userData.checkout]);

  const addItemToCart = useCallback(
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

  const removeItemFromCart = useCallback(
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
  const showModalHandler = useCallback(() => {
    setModalIsShown(true);
  }, []);
  const hideModalHandler = useCallback(() => {
    setModalIsShown(false);
  }, []);
  const contextValue = useMemo(() => {
    return {
      addItem: addItemToCart,
      removeItem: removeItemFromCart,
      showModal: showModalHandler,
      hideModal: hideModalHandler,
      modalIsShown,
    };
  }, [
    addItemToCart,
    removeItemFromCart,
    modalIsShown,
    hideModalHandler,
    showModalHandler,
  ]);
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
