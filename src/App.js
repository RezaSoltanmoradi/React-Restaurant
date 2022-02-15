import { useContext } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import allRoutes from "./helper/allRoutes";
import MainContext from "./components/context/MainContext";
import HomePage from "./pages/home/home";
import Login from "./pages/Login/Login";
function App() {
    const useCtx = useContext(MainContext);
    const { isLoggedIn } = useCtx;
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    {!isLoggedIn && (
                        <Route
                            path={allRoutes.loginRoute()}
                            element={<Login />}
                        />
                    )}
                    <Route
                        path={allRoutes.homeRoute()}
                        element={<HomePage />}
                    />
                    ) )
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}

export default App;
