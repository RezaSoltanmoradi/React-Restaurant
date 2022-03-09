import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import allRoutes from "../../helper/allRoutes";
import MainContext from "../context/MainContext";
import styles from "./Header.module.scss";
import HeaderCardButton from "./HeaderCardButton";

const Header = () => {
    const useCtx = useContext(MainContext);
    const { isLoggedIn, onLogout, showCardItems, userName } = useCtx;

    return (
        <Fragment>
            <header className={styles.header}>
                <div className="col-12 row text-center ">
                    <div className=" col-5 col-md-4">
                        {!isLoggedIn && (
                            <Link
                                to={allRoutes.loginRoute()}
                                className={styles.navLing}
                            >
                                ورود
                            </Link>
                        )}
                        <div>
                            {isLoggedIn && (
                                <div className="col-12 py-0 my-0">
                                    <div className="col-6 mb-0 pb-0 text-center ">
                                        <p
                                            className={`${styles.entired} text-center`}
                                        >
                                            {userName}
                                        </p>
                                    </div>
                                    <div className="col-6 pt-2 mb-5">
                                        <Link
                                            to={allRoutes.homeRoute()}
                                            onClick={onLogout}
                                            className={styles.navLing}
                                        >
                                            خروج
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-8  col-7 d-md-flex justify-content-center text-center">
                        <div className="col-6 col-md-5  offset-2">
                            <h1>غذا های ایرانی</h1>
                        </div>
                        <div className="col-6  col-md-5 col-lg-3 offset-lg-3 offset-1 ">
                            {isLoggedIn && (
                                <HeaderCardButton onClick={showCardItems} />
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    );
};
export default Header;
