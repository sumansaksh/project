import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCES,
  CREATE_ORDER_FAIL,
  CLEAR_ERROR,
  MYORDERS_REQUEST,
  MYORDERS_SUCCES,
  MYORDERS_FAIL,
  MYORDERS_DETAILS_REQUEST,
  MYORDERS_DETAILS_FAIL,
  MYORDERS_DETAILS_SUCCES,
} from "../Constants/orderConstants";
import axios from "axios";

//create order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCES, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

//my Orders

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MYORDERS_REQUEST });

    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };

    const { data } = await axios.get("/orders/me", config);

    dispatch({ type: MYORDERS_SUCCES, payload: data.orders });
  } catch (error) {
    dispatch({ type: MYORDERS_FAIL, payload: error.response.data.message });
  }
};

// get order details
export const myOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MYORDERS_DETAILS_REQUEST });

    const { data } = await axios.get(`/order/${id}`);

    dispatch({ type: MYORDERS_DETAILS_SUCCES, payload: data.order });
  } catch (error) {
    dispatch({
      type: MYORDERS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//CLEARING ERROR
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
