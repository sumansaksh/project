import "./App.css";
import webFont from "webfontloader";
import Headers from "./component/layout/Header/Headers.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js";
import Contact from "./component/Home/Contact.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.jsx";
import store from "./store";
import LoginSignUp from "./component/user/LoginSignUp";
import { loadUser } from "./Actions/userActions";
import { UserOptions } from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.jsx";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile.jsx";

import UpdatePassword from "./component/user/UpdatePassword.jsx";
import ForgotPassword from "./component/user/ForgotPassword.jsx";
import ResetPassword from "./component/user/ResetPassword.jsx";

import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Cart/MyOrders.jsx";
import MyOrderDetails from "./component/Cart/MyOrderDetails.jsx";

import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreateProduct from "./component/Admin/CreateProduct";
import About from "./component/About/About.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  //helps preven pepope from inspecting
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div className="App">
      <Router>
        <Headers />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:keyword" element={<Products />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            exact
            path="/account"
            element={<ProtectedRoute component={Profile} />}
          />

          <Route
            exact
            path="/me/update"
            element={<ProtectedRoute component={UpdateProfile} />}
          />

          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute component={UpdatePassword} />}
          />

          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route path="/login" element={<LoginSignUp />}></Route>
          <Route path="/cart" element={<Cart />}></Route>

          <Route
            exact
            path="/shipping"
            element={<ProtectedRoute component={Shipping} />}
          />

          <Route
            exact
            path="/order/confirm"
            element={<ProtectedRoute component={ConfirmOrder} />}
          />

          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute component={Payment} />
                </Elements>
              }
            />
          )}

          <Route
            exact
            path="/success"
            element={<ProtectedRoute component={OrderSuccess} />}
          />

          <Route
            exact
            path="/orders/me"
            element={<ProtectedRoute component={MyOrders} />}
          />

          <Route
            exact
            path="/orders/me/:id"
            element={<ProtectedRoute component={MyOrderDetails} />}
          />

          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute isAdmin={true} component={CreateProduct} />
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

///switch statements helps to render page not found

export default App;
