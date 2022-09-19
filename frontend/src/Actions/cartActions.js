import {
  ADD_TO_CART,
  REMOVE_CART_ITEMS,
  SAVE_SHIPPING_ADRESS,
} from "../Constants/cartConstants";
import axios from "axios";

//add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEMS, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//SAVE_SHIPPING_ADRESS

export const saveShippingAdress = (adress) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADRESS, payload: adress });

  localStorage.setItem("shippingAdress", JSON.stringify(adress));
};
