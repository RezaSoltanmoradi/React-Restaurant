import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import  AuthContextProvider  from "./context/AuthContext";
import  CartContextProvider  from "./context/CartContext";

ReactDOM.render(
  <AuthContextProvider>
    <CartContextProvider>
      <Router>
        <App />
      </Router>
    </CartContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
