import { Fragment, memo, useContext } from "react";
import { NavLink } from "react-router-dom";
import allRoutes from "../../helper/allRoutes";
import styles from "./Header.module.scss";
import HeaderCardButton from "./HeaderCardButton";
import { GrRestaurant } from "react-icons/gr";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { MdOutlineExitToApp } from "react-icons/md";
const Header = () => {
  const { userData, isLoggedIn, onLogout } = useContext(AuthContext);
  const { showCardItems } = useContext(CartContext);
  return (
    <Fragment>
      <header className={styles.header}>
        <div className="col-12 row text-center mx-auto m-0 p-0 h-100">
          <div
            className={`${
              !isLoggedIn ? "col-5" : "col-6"
            } col-md-4 h-100 d-flex align-items-center justify-content-center`}
          >
            {!isLoggedIn && (
              <nav className={styles.Nav}>
                <NavLink
                  to={allRoutes.loginRoute()}
                  className={({ isActive }) =>
                    isActive ? styles.ActiveLink : styles.link
                  }
                >
                  ورود
                </NavLink>
                <span>/</span>
                <NavLink
                  to={allRoutes.registerRoute()}
                  className={({ isActive }) =>
                    isActive ? styles.ActiveLink : styles.link
                  }
                >
                  ثبت نام
                </NavLink>
              </nav>
            )}
            {isLoggedIn && (
              <div className="col-12  h-100 d-flex justify-content-space-around flex-row text-center">
                <div className="col-3 h-100 d-flex align-items-center justify-content-center">
                  <NavLink
                    to={allRoutes.loginRoute()}
                    onClick={onLogout}
                    className={`${styles.exitButton} rounded`}
                  >
                    خروج
                    <MdOutlineExitToApp />
                  </NavLink>
                </div>
                <div className="col-9 mb-0 pb-0 text-center h-100 d-flex align-items-center justify-content-center justify-content-md-start ">
                  <p className={`${styles.entired}  p-0 m-0`}>
                    {userData?.userName}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`${
              isLoggedIn ? "justify-content-around" : "justify-content-center"
            } col-md-8  col-6 d-flex flex-collumn flex-lg-row align-items-center flex-lg-row h-100 text-center  p-0 m-0 `}
          >
            <div
              className={`col-12 col-md-4 justify-content-center  d-lg-flex ${
                isLoggedIn ? "d-none d-md-flex" : "d-flex"
              }`}
            >
              <div className={styles.title}>
                <h1 className="text-center ">ایرانی فود</h1>
                <span className={styles.icon}>
                  <GrRestaurant />
                </span>
              </div>
            </div>
            {isLoggedIn && (
              <div className="col-12 col-md-4 col-lg-3 offset-lg-1 d-flex justify-content-center">
                <HeaderCardButton onClick={showCardItems} />
              </div>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};
export default memo(Header);
