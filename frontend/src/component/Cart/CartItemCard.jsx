import React from "react";
import "./carTItemCard.css";
import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <>
      <div className="cartItemCard">
        <img src={item.image} alt="item.name" />
        <div>
          <Link className="cartProductName" to={`/product/${item.product}`}>
            {item.name}
          </Link>
          <span>{`Price: ₹${item.price}`}</span>
          <p onClick={() => deleteCartItems(item.product)}>Remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
