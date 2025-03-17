import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getStorage } from "../helper/getStorage";

export const AuthContext = createContext({
  onRegister: () => {},
  onLogin: () => {},
  onLogout: () => {},
  isLoggedIn: false,
  allUsers: [],
  userData: {},
  updateAllUsers: () => {},
  updateUserData: () => {},
  clearCheckout: () => {},
});

const defaultUsers = getStorage("allUsers", []);
const defaultUserData = getStorage("userData", {
  checkout: {
    items: [],
    totalAmount: 0,
  },
});
const defaultLoggedin = getStorage("isLoggedIn", false);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultLoggedin);
  const [users, setUsers] = useState(defaultUsers);
  const [userData, setUserData] = useState(defaultUserData);

  const isMatchItem = useMemo(
    () => (key, value) => users.some((user) => user[key] === value),
    [users]
  );
  const loginHandler = useCallback(
    ({ email, password }) => {
      const foundEmail = isMatchItem("email", email);
      const foundpassword = isMatchItem("password", password);
      if (foundEmail && foundpassword) {
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );
        setUserData((prev) => {
          if (!foundUser) return prev;
          const updatedUserData = { ...prev, ...foundUser };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          return updatedUserData;
        });
        setIsLoggedIn(() => {
          const updatedLoggedin = true;
          localStorage.setItem("isLoggedIn", JSON.stringify(updatedLoggedin));
          return updatedLoggedin;
        });
      } else {
        throw new Error("هیچ کاربری با این ایمیل و رمز عبور پیدا نشد ❗");
      }
    },
    [isMatchItem, users]
  );
  const registerHander = useCallback(
    ({ userName, password, email }) => {
      const newUserData = {
        userName,
        email,
        password,
        checkout: {
          items: [],
          totalAmount: 0,
        },
      };
      const foundEmail = isMatchItem("email", email);

      if (!foundEmail) {
        setUsers((prevUsers) => {
          const updatedUsers = [newUserData, ...prevUsers];
          localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

          return updatedUsers;
        });
      } else {
        throw new Error("کاربری قبلا با این ایمیل ثبت نام کرده ❗");
      }
    },
    [isMatchItem]
  );

  const updateAllUsers = useCallback(
    ({ checkout, email }) => {
      const foundEamil = isMatchItem("email", email);
      if (foundEamil) {
        setUsers((prevUsers) => {
          return prevUsers?.map((user) => {
            return user.email === email ? { ...user, checkout } : user;
          });
        });
      }
    },
    [isMatchItem]
  );
  const updateUserData = useCallback(({ checkout }) => {
    setUserData((prevUser) => {
      return { ...prevUser, checkout };
    });
  }, []);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserData({
      checkout: {
        items: [],
        totalAmount: 0,
      },
    });
  };
  const clearCheckout = useCallback(() => {
    setUserData((prevUserData) => {
      const updatedData = {
        ...prevUserData,
        checkout: {
          items: [],
          totalAmount: 0,
        },
      };
      updateAllUsers({
        email: userData.email,
        checkout: {
          items: [],
          totalAmount: 0,
        },
      });
      localStorage.setItem("userData", JSON.stringify(updatedData));
      return updatedData;
    });
  }, [updateAllUsers, userData]);
  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(users));
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [users, userData, isLoggedIn, clearCheckout]);
  const contextValue = useMemo(() => {
    return {
      onRegister: registerHander,
      onLogin: loginHandler,
      onLogout: logoutHandler,
      isLoggedIn,
      userData,
      allUsers: users,
      updateUserData,
      updateAllUsers,
      clearCheckout,
    };
  }, [
    users,
    userData,
    isLoggedIn,
    registerHander,
    loginHandler,
    updateAllUsers,
    updateUserData,
    clearCheckout,
  ]);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
