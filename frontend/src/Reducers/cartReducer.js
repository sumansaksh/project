import {
  ADD_TO_CART,
  REMOVE_CART_ITEMS,
  SAVE_SHIPPING_ADRESS,
} from "../Constants/cartConstants";
export const cartReducer = (
  state = { cartItems: [], adressInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        adressInfo: action.payload,
      };
    default:
      return state;
  }
};
