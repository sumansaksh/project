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

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCES:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MYORDERS_REQUEST:
      return {
        loading: true,
      };

    case MYORDERS_SUCCES:
      return {
        loading: false,
        orders: action.payload,
      };

    case MYORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

export const myOrdersDtailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case MYORDERS_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case MYORDERS_DETAILS_SUCCES:
      return {
        loading: false,
        order: action.payload,
      };

    case MYORDERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
