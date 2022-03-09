import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "./index.scss";
import App from "./App";
import ContextProvider from "./components/context/ContextProvider";
ReactDOM.render(
    <ContextProvider>
        <App />
    </ContextProvider>,
    document.getElementById("root")
);
