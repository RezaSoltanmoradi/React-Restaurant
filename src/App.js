import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import allRoutes from "./helper/allRoutes";
import HomePage from "./pages/home/home";
import Login from "./pages/Login/Login";
import MainContext from "./components/context/MainContext";
const App = () => {
    const context = useContext(MainContext);
    const { isLoggedIn } = context;
    return (
        <Fragment>
            <Router>
                <Routes>
                    {!isLoggedIn ? (
                        <Route
                            path={allRoutes.loginRoute()}
                            element={<Login />}
                        />
                    ) : (
                        <Route
                            path={allRoutes.loginRoute()}
                            element={<Navigate to={allRoutes.homeRoute()} />}
                        />
                    )}
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={
                                    !isLoggedIn
                                        ? `${allRoutes.homeRoute()}`
                                        : `${allRoutes.loginRoute()}`
                                }
                            />
                        }
                    />
                    <Route
                        path={allRoutes.homeRoute()}
                        element={<HomePage />}
                    />
                </Routes>
            </Router>
        </Fragment>
    );
};

export default App;
