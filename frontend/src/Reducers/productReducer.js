import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCES,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCES,
  NEW_PRODUCT_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCES,
  PRODUCT_DETAILS_FAIL,
  NEWREVIEW_REQUEST,
  NEWREVIEW_SUCCES,
  NEWREVIEW_FAIL,
  NEWREVIEW_RESET,
  CLEAR_ERROR,
} from "../Constants/ProductConstants";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCES:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.producstCount,
        resultPerPage: action.payload.resultPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
        uniqueList: action.payload.uniqueList,
        gender: action.payload.gender,
      };
    case ALL_PRODUCT_FAIL:
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

export const productsDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCES:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
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

export const newProductReducer = (state = { products: {} }, action) => {
  
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCES:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
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
//
//
//
//
//
//
//
//
//

export const NewReviewReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEWREVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEWREVIEW_SUCCES:
      return {
        loading: false,
        success: action.payload,
      };
    case NEWREVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case NEWREVIEW_RESET:
      return {
        ...state,
        success: false,
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
