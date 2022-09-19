import React, { useEffect } from "react";
import "./MyOrderDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { myOrderDetails, clearError } from "../../Actions/orderAction";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import OrderSuccsessIcon from "./OrderSuccsessIcon.jsx";
import OrderProcessingIcon from "./OrderProcessingIcon.jsx";

const MyOrderDetails = () => {
  const { order, loading, error } = useSelector(
    (state) => state.myOrdersDetails
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(myOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="orderDetail">
            <div className="orderDetailsPage">
              <div className="orderDetailsDiv">
                <h1 id="myOrderHeading">{`Order Id ${order._id}`}</h1>
                <h2>Shipping Information</h2>
                <div className="orderDetailsBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>contact No:</p>
                    <span>{order.adressInfo && order.adressInfo.phone}</span>
                  </div>
                  <div>
                    <p>Adress:</p>
                    <span>
                      {order.adressInfo &&
                        `${order.adressInfo.street}, ${order.adressInfo.city}, ${order.adressInfo.state}, ${order.adressInfo.country}, ${order.adressInfo.pinCode}`}
                    </span>
                  </div>
                </div>

                <div className="orderDetailsBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                </div>
                <h1>order Payment</h1>
                <div className="orderDetailsBox">
                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice}</span>
                  </div>
                </div>

                <h2>Order Status</h2>
                <div className="orderDetailsBox">
                  <div>
                    {order.orderStatus === "Delivered" ? (
                      <OrderSuccsessIcon />
                    ) : (
                      <OrderProcessingIcon />
                    )}
                  </div>
                </div>
                <h2>Order Items</h2>
                <div className="confirmCartItemsContainer">
                  {order.orderItems &&
                    order.orderItems.map((item) => (
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrderDetails;
