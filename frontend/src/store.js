import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  NewReviewReducer,
  productsDetailsReducer,
  productsReducer,
  newProductReducer,
} from "./Reducers/productReducer";

import { cartReducer } from "./Reducers/cartReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  myOrdersDtailsReducer,
} from "./Reducers/orderReducer";

import {
  userReducer,
  ProfileReducer,
  forgotPasswordReducer,
} from "./Reducers/userReducer";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productsDetailsReducer,
  user: userReducer,
  profile: ProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  myOrdersDetails: myOrdersDtailsReducer,
  reviewes: NewReviewReducer,
  newProducts: newProductReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    adressInfo: localStorage.getItem("shippingAdress")
      ? JSON.parse(localStorage.getItem("shippingAdress"))
      : {},
  },
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
