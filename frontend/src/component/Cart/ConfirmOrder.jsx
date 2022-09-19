import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./confirmOrder.css";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { cartItems, adressInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };
  return (
    <>
      <div className="confirmOrderHeader">
        <h1>confirm order</h1>
      </div>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmCartItems">
            <h2>Cart Items:</h2>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <div style={{ margin: "2vmax" }}>
                      <div>{item.name}</div>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="confirmshippingArea">
            <h2>Shipping Adress</h2>
            <div className="confirmshippingAreaBox">
              <div>
                <p> Name:</p>
                <span>{adressInfo.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{adressInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{adressInfo.street}</span>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <h2>Order Summery</h2>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{"subtotal"}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
