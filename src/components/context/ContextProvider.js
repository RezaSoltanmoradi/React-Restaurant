import { useEffect, useReducer, useState } from "react";
import MainContext from "./MainContext";

const defaultState = JSON.parse(localStorage.getItem("data")) || {
    items: [],
    totalAmount: 0,
};
const types = {
    addItem: "ADD_ITEM",
    removeItem: "REMOVE_ITEM",
    claerCart: "CLEAR_CART",
};
const CartReducer = (state, action) => {
    switch (action.type) {
        case types.addItem: {
            const updateTotalAmount =
                state.totalAmount + action.item.price * action.item.amount;

            const foundedItemIndex = state.items.findIndex(
                (item) => item.productId === action.item.productId
            );
            const existingCartItem = state.items[foundedItemIndex];
            let updatedItems;
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[foundedItemIndex] = updatedItem;
            } else {
                updatedItems = [...state.items, action.item];
            }
            const newState = {
                items: updatedItems,
                totalAmount: updateTotalAmount,
            };
            localStorage.setItem("data", JSON.stringify(newState));

            return {
                items: updatedItems,
                totalAmount: updateTotalAmount,
            };
        }
        case types.removeItem: {
            const foundedItemIndex = state.items.findIndex(
                (item) => action.id === item.productId
            );
            const existingCartItem = state.items[foundedItemIndex];
            const updateTotalAmount =
                state.totalAmount - existingCartItem.price;
            let updatedItems;
            if (existingCartItem.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => action.id !== item.productId
                );
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - 1,
                };
                updatedItems = [...state.items];
                updatedItems[foundedItemIndex] = updatedItem;
            }
            const newState = {
                items: updatedItems,
                totalAmount: updateTotalAmount,
            };
            localStorage.setItem("data", JSON.stringify(newState));
            return {
                items: updatedItems,
                totalAmount: updateTotalAmount,
            };
        }
        case types.claerCart:
            localStorage.removeItem("data");
            return {
                items: [],
                totalAmount: 0,
            };

        default: {
            return defaultState;
        }
    }
};
const ContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        CartReducer,
        defaultState
    );

    const addItemtoCartHandler = (item) => {
        dispatchCartAction({ type: types.addItem, item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: types.removeItem, id: id });
    };
    const claerCartItmesHandler = () => {
        dispatchCartAction({ type: types.claerCart });
    };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");

    const userNameHandle = (userName) => {
        setUserName(userName);
    };
    useEffect(() => {
        const userisLoggedIn = localStorage.getItem("isLoggedIn");
        const userNameValue = localStorage.getItem("userName");
        if (userisLoggedIn === "1") {
            setIsLoggedIn(true);
            setUserName(userNameValue);
        }
    }, []);

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        localStorage.setItem("userName", userName);
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        dispatchCartAction({ type: types.claerCart });
        setIsLoggedIn(false);
    };
    const [cardIsShown, setCardIsShown] = useState(false);
    const showCardHandler = () => {
        setCardIsShown(true);
    };
    const hideCardShown = () => {
        setCardIsShown(false);
    };
    const mainContext = {
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemtoCartHandler,
        removeItem: removeItemFromCartHandler,
        claerCart: claerCartItmesHandler,
        showCardItems: showCardHandler,
        hideCardItems: hideCardShown,
        cardIsShown: cardIsShown,
        userNameHandle: userNameHandle,
        userName: userName,
    };
    return (
        <MainContext.Provider value={mainContext}>
            {props.children}
        </MainContext.Provider>
    );
};
export default ContextProvider;
