import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCES,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCES,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCES,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
  NEWREVIEW_REQUEST,
  NEWREVIEW_SUCCES,
  NEWREVIEW_FAIL,
} from "../Constants/ProductConstants";

import axios from "axios";

export const getProduct =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category = "All",
    gender = "All",
    ratings = 0,
    sort = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category === "Indian & Festive") {
        category = "Indian";
      }
      if (category === "") {
        category = "All";
      }
      if (gender === "") {
        gender = "All";
      }
      if (gender === "All" && category === "All") {
        link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sort=${sort}`;
      } else if (category === "All") {
        link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&gender=${gender}&ratings[gte]=${ratings}&sort=${sort}`;
      } else if (gender === "All") {
        link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&sort=${sort}`;
      } else if (gender && category) {
        link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&gender=${gender}&category=${category}&ratings[gte]=${ratings}&sort=${sort}`;
      } else if (sort === "remove-all") {
        link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sort=${sort}`;
      }
      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCT_SUCCES, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//Clearing the and making null
export const clearError = async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const getProductSub = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link = `/products`;

    const { data } = await axios.get(link);

    dispatch({ type: ALL_PRODUCT_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/product/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCES, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//new Revew
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEWREVIEW_REQUEST });
    const { data } = await axios.put(`/review`, reviewData);

    dispatch({ type: NEWREVIEW_SUCCES, payload: data.success });
    // getProductDetails()
  } catch (error) {
    dispatch({
      type: NEWREVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//
//
//
//

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const { data } = await axios.post(`admin/product/new`, productData);

    dispatch({ type: NEW_PRODUCT_SUCCES, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};
