import React from "react";
import "./Home.css";
import Product from "./Product.js";
import { getProduct } from "../../Actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  
  React.useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, alert, error]);
  return (
    <>
      {loading === true ? (
        <Loader />
      ) : (
        <>
          <div className="banner">
            <p>Welcome to Fashion Hub</p>
            <h1>FIND AMAZING PRODUCT bELOW</h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Product</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
};
export default Home;
