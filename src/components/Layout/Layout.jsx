import { memo, useContext } from "react";
import Header from "./Header";
import { CartContext } from "../../context/CartContext";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { cardIsShown } = useContext(CartContext);

  return (
    <div
      style={{
        height: cardIsShown && "100vh",
        overflow: cardIsShown && "hidden",
      }}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default memo(Layout);
