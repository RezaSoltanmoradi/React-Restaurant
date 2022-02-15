import { useEffect, useReducer, useState } from "react";
import MainContext from "./MainContext";

const defaultState = {
    items: [],
    totalAmount: 0,
};
const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
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
            return {
                items: updatedItems,
                totalAmount: updateTotalAmount,
            };
        }
        case "REMOVE_ITEM": {
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

            return {
                totalAmount: updateTotalAmount,
                items: updatedItems,
            };
        }
        case "REMOVE_ALLITEM": {
            console.log("case items: ", state.items);
            return {
                ...state,
                totalAmount: 0,
                items: [],
            };
        }
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
        dispatchCartAction({ type: "ADD_ITEM", item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE_ITEM", id: id });
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
        console.log("login Items: ", cartState.items);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");
        dispatchCartAction({ type: "REMOVE_ALLITEM" });
        setIsLoggedIn(false);
        setTimeout(() => {
            console.log("logout Items: ", cartState.items);
        }, 2000);
    };
    const [cardIsShown, setCardIsShown] = useState(false);
    const showCardHandler = () => {
        setCardIsShown(false);
    };
    const hideCardShown = () => {
        setCardIsShown(true);
    };
    const mainContext = {
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemtoCartHandler,
        removeItem: removeItemFromCartHandler,
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
