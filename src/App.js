import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom"; // از react-router-dom استفاده کنید
import allRoutes from "./helper/allRoutes";
import HomePage from "./pages/home/home";
import Auth from "./pages/Auth/Auth";
import Layout from "./components/Layout/Layout";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        {!isLoggedIn ? (
          <Route path={allRoutes.authRout()} element={<Auth />}>
            <Route index element={<Auth />} />
            <Route path="/auth/:authId" element={<Auth />} />
          </Route>
        ) : (
          <Route
            path={allRoutes.loginRoute()}
            element={<Navigate to={allRoutes.homeRoute()} />} // اینجا از Navigate برای ریدایرکت استفاده کردیم
          />
        )}

        <Route
          path="*"
          element={
            <Navigate
              to={isLoggedIn ? allRoutes.homeRoute() : allRoutes.loginRoute()}
            />
          }
        />
        <Route path={allRoutes.homeRoute()} element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
