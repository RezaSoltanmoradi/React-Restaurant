import { createContext } from "react";

const MainContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: () => {},
    userNameHandle: () => {},
    userName: "",
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    showCardItems: () => {},
    hideCardItems: () => {},
    cardIsShown: false,
});
export default MainContext;
